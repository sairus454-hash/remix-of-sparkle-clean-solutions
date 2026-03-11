import Layout from '@/components/Layout';
import SEO from '@/components/SEO';

const sitemapUrls = [
  { loc: 'https://masterclean1885.com/', priority: '1.0' },
  { loc: 'https://masterclean1885.com/services', priority: '0.9' },
  { loc: 'https://masterclean1885.com/services/residential-cleaning' },
  { loc: 'https://masterclean1885.com/services/commercial-cleaning' },
  { loc: 'https://masterclean1885.com/services/carpet-cleaning' },
  { loc: 'https://masterclean1885.com/services/pressure-washing' },
  { loc: 'https://masterclean1885.com/services/window-cleaning' },
  { loc: 'https://masterclean1885.com/blog' },
  { loc: 'https://masterclean1885.com/contact' },
];

const Sitemap = () => {
  return (
    <Layout>
      <SEO
        title="Sitemap | MasterClean"
        description="Mapa strony MasterClean — wszystkie podstrony serwisu."
        canonical="/sitemap"
      />
      <div className="container mx-auto px-4 py-16 min-h-[60vh]">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8 text-foreground">Sitemap</h1>
        <div className="bg-card border border-border rounded-xl p-6 overflow-x-auto">
          <pre className="text-sm text-foreground/80 whitespace-pre-wrap font-mono leading-relaxed">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.priority ? `\n    <priority>${u.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`}
          </pre>
        </div>

        <div className="mt-10">
          <h2 className="font-serif text-xl font-semibold mb-4 text-foreground">Strony</h2>
          <ul className="space-y-2">
            {sitemapUrls.map((u) => (
              <li key={u.loc}>
                <a
                  href={u.loc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline text-sm break-all"
                >
                  {u.loc}
                </a>
                {u.priority && (
                  <span className="ml-2 text-xs text-muted-foreground">priority: {u.priority}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
