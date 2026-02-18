import { useState, useEffect } from 'react';
import { useSplash } from '@/hooks/useSplash';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import ReviewsSplash from '@/components/ReviewsSplash';
import CircularRevealCard from '@/components/CircularRevealCard';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Star, Send, Loader2, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import happyCustomerImage from '@/assets/happy-customer.jpg';
import { supabase } from '@/integrations/supabase/client';
import SimpleCaptcha from '@/components/SimpleCaptcha';
interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  created_at: string;
  source?: 'google' | 'local';
}

// Sample reviews for display alongside database reviews
const sampleReviews = [{
  id: 'sample-1',
  name: 'Anna K.',
  rating: 5,
  date: '2025-01-15',
  source: 'google' as const
}, {
  id: 'sample-2',
  name: 'Piotr M.',
  rating: 5,
  date: '2025-01-10',
  source: 'google' as const
}, {
  id: 'sample-3',
  name: 'Olena S.',
  rating: 5,
  date: '2025-01-05',
  source: 'google' as const
}, {
  id: 'sample-4',
  name: 'Michał W.',
  rating: 5,
  date: '2024-12-28',
  source: 'google' as const
}, {
  id: 'sample-5',
  name: 'Kateryna P.',
  rating: 5,
  date: '2024-12-20',
  source: 'google' as const
}];
const GOOGLE_REVIEW_URL = 'https://www.google.com/maps/place/MasterClean/@51.953761,19.1343692,6z/data=!4m8!3m7!1s0x23a6312acab4ccd1:0x151f5acde8136ace!8m2!3d51.953761!4d19.1343692!9m1!1b1!16s%2Fg%2F11xm28yrtl?entry=ttu&g_ep=EgoyMDI1MDEyOS4xIKXMDSoASAFQAw%3D%3D';
const Reviews = () => {
  const {
    t,
    language
  } = useLanguage();
  const { showSplash, handleSplashComplete } = useSplash('reviews');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [dbReviews, setDbReviews] = useState<Review[]>([]);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    text: ''
  });

  // Fetch reviews from database
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('reviews').select('*').order('created_at', {
          ascending: false
        });
        if (error) throw error;
        setDbReviews(data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  // Combine sample reviews with database reviews
  const getSampleReviewText = (id: string) => {
    const textMap: {
      [key: string]: string;
    } = {
      'sample-1': t.reviews.review1,
      'sample-2': t.reviews.review2,
      'sample-3': t.reviews.review3,
      'sample-4': t.reviews.review4,
      'sample-5': t.reviews.review5
    };
    return textMap[id] || '';
  };
  const allReviews = [...dbReviews.map(r => ({
    ...r,
    source: 'local' as const
  })), ...sampleReviews.map(r => ({
    ...r,
    text: getSampleReviewText(r.id),
    created_at: r.date
  }))];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: t.reviews.selectRating,
        variant: 'destructive'
      });
      return;
    }
    if (!isCaptchaValid) {
      toast({
        title: language === 'ru' ? 'Ошибка' : language === 'uk' ? 'Помилка' : language === 'pl' ? 'Błąd' : 'Error',
        description: language === 'ru' ? 'Пожалуйста, решите капчу' : language === 'uk' ? 'Будь ласка, розв\'яжіть капчу' : language === 'pl' ? 'Proszę rozwiązać captcha' : 'Please solve the captcha',
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('submit-review', {
        body: {
          name: formData.name,
          rating: rating,
          text: formData.text
        }
      });
      if (error) throw error;

      // Add review to local state immediately
      const newReview: Review = {
        id: crypto.randomUUID(),
        name: formData.name,
        rating: rating,
        text: formData.text,
        created_at: new Date().toISOString(),
        source: 'local'
      };
      setDbReviews(prev => [newReview, ...prev]);
      toast({
        title: t.reviews.successTitle,
        description: t.reviews.successMessage
      });
      setFormData({
        name: '',
        text: ''
      });
      setRating(0);
      setIsCaptchaValid(false);
      setShowGooglePrompt(true);
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const renderStars = (count: number, interactive = false) => {
    return <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-5 h-5 transition-colors ${star <= (interactive ? hoverRating || rating : count) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`} onClick={interactive ? () => setRating(star) : undefined} onMouseEnter={interactive ? () => setHoverRating(star) : undefined} onMouseLeave={interactive ? () => setHoverRating(0) : undefined} />)}
      </div>;
  };
  return <>
      <SEO
        title="Отзывы клиентов MasterClean"
        description="Реальные отзывы клиентов о химчистке мебели, ковров и авто. Узнайте, почему нам доверяют. Оставьте свой отзыв."
        keywords="отзывы химчистка, отзывы MasterClean, отзывы клиентов, качество чистки"
        canonical="/reviews"
        image="https://masterclean1885.lovable.app/og-reviews.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'MasterClean',
          aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', bestRating: '5', ratingCount: '100' },
          url: 'https://masterclean1885.lovable.app/reviews',
        }}
      />
      {showSplash && <ReviewsSplash onComplete={handleSplashComplete} />}
      <Layout>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4 text-center">
            {/* Animated cleanliness icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{
                animation: 'float 3s ease-in-out infinite'
              }}>
                  <Sparkles className="w-10 h-10 text-primary-foreground" style={{
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh opacity-75" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary opacity-60" />
              </div>
            </div>
            
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
            animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
          }}>
              {t.reviews.title}
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-secondary bg-muted">
              {t.reviews.subtitle}
            </p>
            
            {/* Google Maps Link */}
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
              <MapPin className="w-5 h-5" />
              {t.reviews.viewOnGoogle}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Happy Customer Photo */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <CircularRevealCard index={0}>
              <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-card bg-gradient-hero p-1 group" style={{
                animation: 'float 5s ease-in-out infinite'
              }}>
                <div className="relative rounded-xl overflow-hidden">
                  <img src={happyCustomerImage} alt="Довольный клиент MasterClean" loading="lazy" decoding="async" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-fresh/20" />
                </div>
              </div>
            </CircularRevealCard>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
            animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
          }}>
              {t.reviews.customerReviews}
            </h2>
            
            {isLoadingReviews ? <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">{t.reviews.loading}</span>
              </div> : allReviews.length === 0 ? <p className="text-center text-muted-foreground py-12">{t.reviews.noReviews}</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {allReviews.map((review, index) => (
                  <CircularRevealCard key={review.id} index={index}>
                    <Card className="hover:shadow-lg transition-shadow h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {review.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{review.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              {review.source === 'google' && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                  Google
                                </span>}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {review.text}
                        </p>
                        <p className="text-xs text-muted-foreground mt-4">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  </CircularRevealCard>
                ))}
              </div>}

            {/* Leave Review Form */}
            <div className="max-w-2xl mx-auto">
              <CircularRevealCard index={0}>
                <Card className="shadow-card">
                  <CardContent className="p-8">
                    <h2 className="font-serif text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{
                      animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite'
                    }}>
                      {t.reviews.leaveReview}
                    </h2>
                    
                    {showGooglePrompt ? <div className="text-center space-y-6">
                        <div className="py-8">
                          <Sparkles className="w-16 h-16 text-fresh mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">{t.reviews.successTitle}</h3>
                          <p className="text-muted-foreground mb-6">{t.reviews.googleReviewPrompt}</p>
                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-hero hover:opacity-90 text-primary-foreground px-6 py-3 rounded-lg shadow-glow transition-all font-medium">
                              <MapPin className="w-5 h-5" />
                              {t.reviews.leaveGoogleReview}
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <Button variant="outline" onClick={() => setShowGooglePrompt(false)}>
                              {t.reviews.leaveReview}
                            </Button>
                          </div>
                        </div>
                      </div> : <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            {t.reviews.yourRating}
                          </label>
                          <div className="flex justify-center py-2">
                            {renderStars(rating, true)}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            {t.form.name}
                          </label>
                          <Input type="text" placeholder={t.form.namePlaceholder} value={formData.name} onChange={e => setFormData({
                            ...formData,
                            name: e.target.value
                          })} required className="bg-card border-border" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">
                            {t.reviews.yourReview}
                          </label>
                          <Textarea placeholder={t.reviews.reviewPlaceholder} value={formData.text} onChange={e => setFormData({
                            ...formData,
                            text: e.target.value
                          })} rows={4} required className="bg-card border-border resize-none" />
                        </div>

                        {/* Captcha */}
                        <SimpleCaptcha onVerify={setIsCaptchaValid} language={language} />

                        <Button type="submit" disabled={isLoading || !isCaptchaValid} className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow transition-all">
                          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                          {t.reviews.submit}
                        </Button>
                      </form>}
                  </CardContent>
                </Card>
              </CircularRevealCard>
            </div>
          </div>
        </section>
      </Layout>
    </>;
};
export default Reviews;