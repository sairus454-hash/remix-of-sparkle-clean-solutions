import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { ArrowLeft, Calendar, Clock, MessageCircle, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { blogArticles, commentLabels } from '@/data/blogArticles';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  name: string;
  text: string;
  created_at: string;
}

const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { toast } = useToast();
  const articles = blogArticles[language] || blogArticles.ru;
  const labels = commentLabels[language] || commentLabels.ru;
  const article = articles.find(a => a.id === Number(id));

  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('blog_comments')
      .select('*')
      .eq('article_id', Number(id))
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setComments(data as Comment[]);
      });
  }, [id]);

  if (!article) return <Navigate to="/blog" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSending(true);
    try {
      const { data: fnData, error } = await supabase.functions.invoke('submit-comment', {
        body: {
          article_id: article.id,
          name: name.trim().slice(0, 100),
          text: text.trim().slice(0, 1000),
        },
      });
      setSending(false);
      if (!error && fnData?.success) {
        toast({ title: labels.success });
        setText('');
        const { data } = await supabase
          .from('blog_comments')
          .select('*')
          .eq('article_id', article.id)
          .order('created_at', { ascending: false });
        if (data) setComments(data as Comment[]);
      } else if (fnData?.error) {
        toast({ title: fnData.error, variant: 'destructive' });
      }
    } catch {
      setSending(false);
      toast({ title: 'Error submitting comment', variant: 'destructive' });
    }
  };

  const fullText = article.fullContent
    ? `${article.content}\n\n${article.fullContent}`
    : article.content;

  return (
    <>
      <SEO
        title={`${article.title} | MasterClean Blog`}
        description={article.summary}
        canonical={`/blog/${article.id}`}
        image="https://masterclean1885.pl/og-blog.png"
        breadcrumbs={[
          { name: 'Blog', path: '/blog' },
          { name: article.title, path: `/blog/${article.id}` },
        ]}
      />
      <Layout>
        <section className="py-10 sm:py-16 bg-gradient-section min-h-screen">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Back */}
            <Link to="/blog">
              <Button variant="ghost" className="mb-6 text-fresh hover:text-fresh/80 font-semibold">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {labels.back}
              </Button>
            </Link>

            {/* Tag */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-card/90 backdrop-blur-sm text-foreground shadow-sm mb-4">
              {article.tag}
            </span>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto object-cover aspect-video"
              />
            </div>

            {/* Summary */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 italic border-l-4 border-primary pl-4">
              {article.summary}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-accent/50 rounded-xl p-6 border border-border/50">
                <p className="text-foreground text-base leading-relaxed whitespace-pre-line">
                  {fullText}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-primary" />
                {labels.title} ({comments.length})
              </h2>

              {/* Comment Form */}
              <Card className="mb-8 bg-gradient-card border-border">
                <CardContent className="p-5">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      placeholder={labels.name}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      maxLength={100}
                      required
                      className="bg-background"
                    />
                    <Textarea
                      placeholder={labels.text}
                      value={text}
                      onChange={e => setText(e.target.value)}
                      maxLength={1000}
                      required
                      rows={3}
                      className="bg-background"
                    />
                    <Button type="submit" disabled={sending || !name.trim() || !text.trim()} className="gap-2">
                      <Send className="w-4 h-4" />
                      {labels.send}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Comments List */}
              {comments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">{labels.empty}</p>
              ) : (
                <div className="space-y-4">
                  {comments.map(comment => (
                    <Card key={comment.id} className="bg-gradient-card border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-semibold text-foreground text-sm">{comment.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-foreground text-sm leading-relaxed pl-10">
                          {comment.text}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default BlogArticle;
