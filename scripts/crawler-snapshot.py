"""Capture the visible main content of every sitemap page for the crawler renderer.

Why: the seo-prerender edge function must give Google the same text visitors
see, page by page, instead of one shared homepage catalogue (Google treated
those copies as duplicates and refused to index them).

Usage (Playwright + running site):
  python3 scripts/crawler-snapshot.py capture http://localhost:8080 /tmp/snap 0 4
      -> captures shard 0 of 4 of sitemap paths into /tmp/snap/*.jsonl
  python3 scripts/crawler-snapshot.py build /tmp/snap
      -> writes supabase/functions/seo-prerender/snapshots/{pl,ru,en,uk}.ts

Re-run both steps after meaningful page-content changes, then deploy seo-prerender.
"""
import asyncio
import json
import re
import sys
import urllib.request
from pathlib import Path

SITE = "https://masterclean1885.com"
ROOT = Path(__file__).resolve().parent.parent
OUT_TS = ROOT / "supabase/functions/seo-prerender/snapshots"
# Pages with their own dedicated crawler body.
SKIP = {"/auto"}
# Only images served from stable public paths survive a new deployment.
STABLE_IMG = re.compile(r"^/(og-[\w-]+\.jpg|power-station\.jpg|city-services/[\w-]+\.jpg|[\w-]+\.(?:jpg|jpeg|png|webp))$")

EXTRACT_JS = r"""
async ({stableImg}) => {
  const main = document.querySelector('#main-content') || document.querySelector('main');
  if (!main) return null;
  const stable = new RegExp(stableImg);
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const ALLOWED = new Set(['H1','H2','H3','H4','P','UL','OL','LI','A','IMG','STRONG','EM','B','TABLE','THEAD','TBODY','TR','TD','TH','FIGURE','FIGCAPTION','SECTION','ARTICLE','BLOCKQUOTE','DL','DT','DD']);
  const DROP = new Set(['SCRIPT','STYLE','NOSCRIPT','SVG','INPUT','SELECT','TEXTAREA','FORM','IFRAME','VIDEO','CANVAS','LABEL','DIALOG','NAV']);
  const captured = new Map(); // aria-controls id -> html
  const capturedIds = new Set();

  function serialize(root) {
    const out = [];
    function walk(n) {
      if (n.nodeType === 3) {
        const parent = n.parentElement;
        const ws = parent ? getComputedStyle(parent).whiteSpace : 'normal';
        let t = n.textContent;
        if (/pre/.test(ws)) {
          const parts = t.split(/\n{2,}/).map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean);
          if (parts.length > 1) { out.push(parts.map(esc).join('</p><p>')); return; }
        }
        t = t.replace(/\s+/g, ' ');
        if (t.trim()) out.push(esc(t));
        return;
      }
      if (n.nodeType !== 1) return;
      const tag = n.tagName;
      if (DROP.has(tag)) return;
      if (n.id && capturedIds.has(n.id)) return;
      if (n.getAttribute('aria-hidden') === 'true' || n.getAttribute('role') === 'dialog') return;
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      if (tag === 'BUTTON') {
        // Keep only disclosure triggers (FAQ questions); calculator controls are noise.
        // Price cards are selectable buttons: keep their text when it is descriptive.
        if (n.getAttribute('aria-controls') && !n.getAttribute('aria-haspopup')) n.childNodes.forEach(walk);
        else if ((n.innerText || '').trim().length >= 12) { out.push('<p>'); n.childNodes.forEach(walk); out.push('</p>'); }
        return;
      }
      if (tag === 'IMG') {
        const src = n.getAttribute('src') || '';
        let path = '';
        try { path = new URL(src, location.href).pathname; } catch {}
        const alt = (n.getAttribute('alt') || '').trim();
        if (alt && stable.test(path)) out.push(`<img src="${esc(path)}" alt="${esc(alt)}" loading="lazy">`);
        return;
      }
      if (ALLOWED.has(tag)) {
        let attrs = '';
        if (tag === 'A') {
          const h = n.getAttribute('href') || '';
          if (!h || h.startsWith('javascript') || h.startsWith('#')) { n.childNodes.forEach(walk); return; }
          let href = h;
          try { const u = new URL(h, location.href); href = u.origin === location.origin ? u.pathname + u.search : u.href; } catch {}
          attrs = ` href="${esc(href)}"`;
        }
        out.push(`<${tag.toLowerCase()}${attrs}>`);
        n.childNodes.forEach(walk);
        out.push(`</${tag.toLowerCase()}>`);
      } else {
        n.childNodes.forEach(walk);
        out.push(' ');
      }
      const extra = n.getAttribute && n.getAttribute('data-snap-after');
      if (extra && captured.has(extra)) out.push(captured.get(extra));
    }
    walk(root);
    return out.join('');
  }

  // Open every disclosure one by one and keep its content (single accordions close the previous one).
  const triggers = [...main.querySelectorAll('button[aria-controls]:not([aria-haspopup])')];
  for (const btn of triggers) {
    const id = btn.getAttribute('aria-controls');
    if (!id || captured.has(id)) continue;
    if (btn.closest('form')) continue;
    if (btn.getAttribute('aria-expanded') !== 'true') { btn.click(); await sleep(120); }
    const region = document.getElementById(id);
    if (!region) continue;
    const html = serialize(region);
    capturedIds.add(id);
    if (html.trim()) captured.set(id, html);
    const holder = btn.closest('h1,h2,h3,h4') || btn;
    holder.setAttribute('data-snap-after', id);
  }
  return serialize(main);
}
"""


def clean(html: str) -> str:
    for _ in range(3):
        html = re.sub(r"<(h[1-4]|p|li|ul|ol|strong|em|b|section|article|figure|figcaption|td|th|tr|a)(?: [^>]*)?>\s*</\1>", "", html)
    html = re.sub(r"\s{2,}", " ", html)
    return html.strip()


def sitemap_paths():
    xml = urllib.request.urlopen(f"{SITE}/sitemap.xml", timeout=30).read().decode()
    paths = [re.sub(r"^https://masterclean1885\.com", "", u) or "/" for u in re.findall(r"<loc>([^<]+)</loc>", xml)]
    out = []
    for p in paths:
        logical = re.sub(r"^/(ru|en|uk)(?=/|$)", "", p) or "/"
        if logical not in SKIP:
            out.append(p)
    return out


async def capture(base: str, outdir: str, shard: int, shards: int):
    from playwright.async_api import async_playwright
    paths = [p for i, p in enumerate(sitemap_paths()) if i % shards == shard]
    Path(outdir).mkdir(parents=True, exist_ok=True)
    out = open(Path(outdir) / f"shard{shard}.jsonl", "a", encoding="utf-8")
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        ctx = await browser.new_context(viewport={"width": 1280, "height": 1800})
        # Decline tracking so the cookie banner does not block content.
        page = await ctx.new_page()
        for path in paths:
            try:
                await page.goto(base + path, wait_until="networkidle", timeout=45000)
                for _ in range(14):
                    await page.mouse.wheel(0, 1600)
                    await page.wait_for_timeout(120)
                await page.wait_for_timeout(600)
                html = await page.evaluate(EXTRACT_JS, {"stableImg": STABLE_IMG.pattern})
                html = clean(html or "")
                out.write(json.dumps({"path": path, "html": html}, ensure_ascii=False) + "\n")
                out.flush()
                print(path, len(html))
            except Exception as e:  # keep going; a missing page falls back to the old body
                print("FAIL", path, e)
        await browser.close()


def build(outdir: str):
    by_lang = {"pl": {}, "ru": {}, "en": {}, "uk": {}}
    for f in sorted(Path(outdir).glob("shard*.jsonl")):
        for line in f.read_text(encoding="utf-8").splitlines():
            row = json.loads(line)
            m = re.match(r"^/(ru|en|uk)(?=/|$)", row["path"])
            lang = m.group(1) if m else "pl"
            logical = re.sub(r"^/(ru|en|uk)(?=/|$)", "", row["path"]) or "/"
            if len(re.sub(r"<[^>]+>", " ", row["html"]).split()) >= 40:
                by_lang[lang][logical] = row["html"]
    OUT_TS.mkdir(parents=True, exist_ok=True)
    for lang, pages in by_lang.items():
        body = json.dumps(dict(sorted(pages.items())), ensure_ascii=False, indent=0)
        (OUT_TS / f"{lang}.ts").write_text(
            "// Generated by scripts/crawler-snapshot.py — visible page content for crawlers. Do not edit by hand.\n"
            f"export const SNAPSHOT_{lang.upper()}: Record<string, string> = {body};\n",
            encoding="utf-8",
        )
        print(lang, len(pages), "pages")


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "capture":
        asyncio.run(capture(sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])))
    elif cmd == "build":
        build(sys.argv[2])
