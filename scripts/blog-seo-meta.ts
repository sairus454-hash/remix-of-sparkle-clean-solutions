import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';
import type { Plugin } from 'vite';

// Read the same article fields used by BlogArticle without loading Vite images
// into the crawler runtime. Assets remain owned by the frontend.
export function syncBlogSeoMeta(root = process.cwd()) {
  const source = readFileSync(resolve(root, 'src/data/blogArticles.ts'), 'utf8')
    .replace(/^import (\w+) from ['"][^'"]+['"];?$/gm, 'const $1 = "";');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const output: { blogArticles?: Record<string, Array<{
    id: number; title: string; summary: string;
    seo?: { title: string; description?: string };
  }>> } = {};
  new Function('exports', compiled)(output);
  if (!output.blogArticles) throw new Error('Blog article data is missing');
  const metadata = Object.fromEntries(Object.entries(output.blogArticles).map(([lang, articles]) => [
    lang, Object.fromEntries(articles.map(article => [String(article.id), {
      title: article.seo?.title || `${article.title} | MasterClean Blog`,
      description: article.seo?.description || article.summary,
    }])),
  ]));
  writeFileSync(resolve(root, 'supabase/functions/seo-prerender/blogMeta.ts'),
    `// Generated from src/data/blogArticles.ts by scripts/blog-seo-meta.ts; do not edit.\nexport const BLOG_META = ${JSON.stringify(metadata, null, 2)};\n`);
  return metadata;
}

export function blogSeoMetaPlugin(): Plugin {
  return { name: 'masterclean-blog-seo-meta', apply: 'build', buildStart() { syncBlogSeoMeta(); } };
}