import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import BlogSplash from '@/components/BlogSplash';
import { useSplash } from '@/hooks/useSplash';
import CircularRevealCard from '@/components/CircularRevealCard';
import { ArrowLeft, Calendar, Clock, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { blogArticles, blogTitles, commentLabels } from '@/data/blogArticles';

// Lazy image
const LazyBlogImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("bg-muted", className)}>
      {isVisible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
};

// TikTok icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Blog = () => {
  const { language } = useLanguage();
  const articles = [...(blogArticles[language] || blogArticles.ru)].reverse();
  const titles = blogTitles[language] || blogTitles.ru;
  const labels = commentLabels[language] || commentLabels.ru;
  const { showSplash, handleSplashComplete } = useSplash('blog');

  return (
    <>
      {showSplash && <BlogSplash onComplete={handleSplashComplete} />}
      <SEO
        title="Blog czystości — Porady czyszczenia | MasterClean"
        description="Przydatne artykuły o praniu tapicerki, sprzątaniu i pielęgnacji mebli. Porady ekspertów, jak dbać o czystość w domu i samochodzie."
        keywords="blog sprzątanie, porady czyszczenia, jak czyścić tapicerkę, jak prać kanapę, porady czystość, jak usunąć plamy, pranie tapicerki porady, czyszczenie materaca, cleaning tips blog, czyszczenie mebli porady"
        canonical="/blog"
        image="https://masterclean1885.pl/og-blog.png"
        breadcrumbs={[{ name: titles.title, path: '/blog' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: titles.title,
          description: titles.subtitle,
          publisher: { '@type': 'Organization', name: 'MasterClean', url: 'https://masterclean1885.pl' },
          url: 'https://masterclean1885.pl/blog',
        }}
      />
      <Layout>
        {/* Hero */}
        <section className="py-12 sm:py-16 bg-gradient-section relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Link to="/">
              <Button variant="ghost" className="mb-6 text-fresh hover:text-fresh/80 animate-pulse-slow font-semibold">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {titles.back}
              </Button>
            </Link>

            <div className="text-center mb-10 sm:mb-14">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow animate-pulse-slow">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh opacity-75" />
                </div>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'shimmer 3s linear infinite' }}>
                📝 {titles.title}
              </h1>
              <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-base sm:text-lg max-w-2xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                {titles.subtitle}
              </p>

              {/* Social Media Links */}
              <div className="mt-6">
                <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-3 text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{titles.social}:</p>
                <div className="flex justify-center flex-wrap gap-3">
                  <CircularRevealCard index={0}>
                    <a href="https://www.tiktok.com/@oleksii764" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <TikTokIcon className="w-5 h-5" />
                      <span className="font-medium text-sm">TikTok</span>
                    </a>
                  </CircularRevealCard>
                  <CircularRevealCard index={1}>
                    <a href="https://youtube.com/@alexlokteks2072?si=SNXrRysVMvjc971H" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                      <span className="font-medium text-sm">YouTube</span>
                    </a>
                  </CircularRevealCard>
                  <CircularRevealCard index={2}>
                    <a href="https://www.instagram.com/masterclean1885?igsh=MTN2amx2cmRka2hwMg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                      <span className="font-medium text-sm">Instagram</span>
                    </a>
                  </CircularRevealCard>
                  <CircularRevealCard index={3}>
                    <a href="https://www.facebook.com/profile.php?id=100057002733751" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-card hover:shadow-glow">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                      <span className="font-medium text-sm">Facebook</span>
                    </a>
                  </CircularRevealCard>
                </div>
              </div>
            </div>

            {/* Floating decorations */}
            <div className="absolute top-20 left-10 opacity-10 pointer-events-none hidden lg:block">
              <BookOpen className="w-16 h-16 text-primary" style={{ animation: 'float 5s ease-in-out infinite' }} />
            </div>
            <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none hidden lg:block">
              <Sparkles className="w-12 h-12 text-fresh" style={{ animation: 'float 4s ease-in-out infinite, pulse 2s ease-in-out infinite' }} />
            </div>

            {/* Articles Grid — title cards only */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((article, index) => (
                <CircularRevealCard key={article.id} index={index} slow className="h-full">
                  <Link to={`/blog/${article.id}`} className="block h-full">
                    <Card className="overflow-hidden h-full bg-gradient-card border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                      <div className="relative overflow-hidden aspect-video">
                        <LazyBlogImage
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 aspect-video"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-card/90 backdrop-blur-sm text-foreground shadow-sm">
                            {article.tag}
                          </span>
                        </div>
                        {/* Overlay gradient for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      </div>
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime}
                          </span>
                        </div>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        <p className="mt-3 text-sm text-primary font-medium flex items-center gap-1">
                          {labels.readArticle} →
                        </p>
                      </div>
                    </Card>
                  </Link>
                </CircularRevealCard>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
