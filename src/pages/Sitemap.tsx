import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

const sitemapUrls = [
  { loc: '/', label: 'Strona główna', priority: '1.0', changefreq: 'weekly' },
  { loc: '/services', label: 'Usługi', priority: '0.9', changefreq: 'weekly' },
  { loc: '/prices', label: 'Cennik', priority: '0.9', changefreq: 'weekly' },
  { loc: '/about', label: 'O nas', priority: '0.8', changefreq: 'monthly' },
  { loc: '/cleaning', label: 'Sprzątanie', priority: '0.8', changefreq: 'weekly' },
  { loc: '/auto', label: 'Czyszczenie aut', priority: '0.8', changefreq: 'weekly' },
  { loc: '/windows', label: 'Mycie okien', priority: '0.8', changefreq: 'weekly' },
  { loc: '/handyman', label: 'Złota rączka', priority: '0.8', changefreq: 'weekly' },
  { loc: '/ozone', label: 'Ozonowanie', priority: '0.8', changefreq: 'weekly' },
  { loc: '/impregnation', label: 'Impregnacja', priority: '0.8', changefreq: 'weekly' },
  { loc: '/equipment', label: 'Sprzęt', priority: '0.7', changefreq: 'monthly' },
  { loc: '/reviews', label: 'Opinie', priority: '0.7', changefreq: 'weekly' },
  { loc: '/blog', label: 'Blog', priority: '0.7', changefreq: 'weekly' },
  { loc: '/contacts', label: 'Kontakt', priority: '0.7', changefreq: 'monthly' },
  { loc: '/privacy-policy', label: 'Polityka prywatności', priority: '0.3', changefreq: 'yearly' },
  { loc: '/terms', label: 'Regulamin', priority: '0.3', changefreq: 'yearly' },
  { loc: '/cookies', label: 'Cookies', priority: '0.3', changefreq: 'yearly' },
  { loc: '/city/wroclaw', label: 'Wrocław', priority: '0.8', changefreq: 'weekly' },
  { loc: '/city/opole', label: 'Opole', priority: '0.8', changefreq: 'weekly' },
  { loc: '/city/legnica', label: 'Legnica', priority: '0.7', changefreq: 'weekly' },
  { loc: '/city/olawa', label: 'Oława', priority: '0.7', changefreq: 'weekly' },
  { loc: '/city/kalisz', label: 'Kalisz', priority: '0.7', changefreq: 'weekly' },
  { loc: '/city/leszno', label: 'Leszno', priority: '0.7', changefreq: 'weekly' },
  { loc: '/city/swidnica', label: 'Świdnica', priority: '0.7', changefreq: 'weekly' },
  { loc: '/city/walbrzych', label: 'Wałbrzych', priority: '0.7', changefreq: 'weekly' },
  { loc: '/city/ostrow-wielkopolski', label: 'Ostrów Wielkopolski', priority: '0.7', changefreq: 'weekly' },
  { loc: '/city/jelenia-gora', label: 'Jelenia Góra', priority: '0.7', changefreq: 'weekly' },
  { loc: '/city/brzeg', label: 'Brzeg', priority: '0.7', changefreq: 'weekly' },
  { loc: '/city/lubin', label: 'Lubin', priority: '0.7', changefreq: 'weekly' },
];

const DOMAIN = 'https://masterclean1885.pl';

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

        {/* Visual sitemap */}
        <div className="mb-12">
          <h2 className="font-serif text-xl font-semibold mb-6 text-foreground">Strony serwisu</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sitemapUrls.map((u) => (
              <Link
                key={u.loc}
                to={u.loc}
                className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {u.label}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {DOMAIN}{u.loc === '/' ? '' : u.loc}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/60 shrink-0 ml-2">
                  {u.priority}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* XML view */}
        <div>
          <h2 className="font-serif text-xl font-semibold mb-4 text-foreground">sitemap.xml</h2>
          <div className="bg-card border border-border rounded-xl p-6 overflow-x-auto">
            <pre className="text-xs text-foreground/80 whitespace-pre-wrap font-mono leading-relaxed">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${DOMAIN}${u.loc === '/' ? '/' : u.loc}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
  </url>`).join('\n')}
</urlset>`}
            </pre>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
