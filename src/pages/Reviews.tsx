import { useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import ReviewsSplash from '@/components/ReviewsSplash';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Star, Send, Loader2, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import happyCustomerImage from '@/assets/happy-customer.jpg';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  source: 'google' | 'local';
}

const Reviews = () => {
  const { t } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    text: '',
  });

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Sample reviews (in real app, these would come from database/API)
  const reviews: Review[] = [
    {
      id: '1',
      name: 'Anna K.',
      rating: 5,
      text: t.reviews.review1,
      date: '2025-01-15',
      source: 'google',
    },
    {
      id: '2',
      name: 'Piotr M.',
      rating: 5,
      text: t.reviews.review2,
      date: '2025-01-10',
      source: 'google',
    },
    {
      id: '3',
      name: 'Olena S.',
      rating: 5,
      text: t.reviews.review3,
      date: '2025-01-05',
      source: 'google',
    },
    {
      id: '4',
      name: 'Michał W.',
      rating: 5,
      text: t.reviews.review4,
      date: '2024-12-28',
      source: 'google',
    },
    {
      id: '5',
      name: 'Kateryna P.',
      rating: 5,
      text: t.reviews.review5,
      date: '2024-12-20',
      source: 'google',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: t.reviews.selectRating,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: t.reviews.successTitle,
      description: t.reviews.successMessage,
    });
    
    setFormData({ name: '', text: '' });
    setRating(0);
    setIsLoading(false);
  };

  const renderStars = (count: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 transition-colors ${
              star <= (interactive ? (hoverRating || rating) : count)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={interactive ? () => setRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {showSplash && <ReviewsSplash onComplete={handleSplashComplete} />}
      <Layout>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4 text-center">
            {/* Animated cleanliness icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <Sparkles className="w-10 h-10 text-primary-foreground" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fresh animate-ping" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.reviews.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t.reviews.subtitle}
            </p>
            
            {/* Google Maps Link */}
            <a
              href="https://www.google.com/maps/place/MasterClean/@51.953761,19.1343692,6z/data=!4m8!3m7!1s0x23a6312acab4ccd1:0x151f5acde8136ace!8m2!3d51.953761!4d19.1343692!9m1!1b1!16s%2Fg%2F11xm28yrtl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <MapPin className="w-5 h-5" />
              {t.reviews.viewOnGoogle}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Happy Customer Photo */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-card bg-gradient-hero p-1 group" style={{ animation: 'float 5s ease-in-out infinite' }}>
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={happyCustomerImage} 
                  alt="Довольный клиент MasterClean" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ animation: 'slowZoom 25s ease-in-out infinite alternate' }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-fresh/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
              {t.reviews.customerReviews}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
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
                          {review.source === 'google' && (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                              Google
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leave Review Form */}
            <div className="max-w-2xl mx-auto">
              <Card className="shadow-card">
                <CardContent className="p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]" style={{ animation: 'float 3s ease-in-out infinite, shimmer 3s linear infinite' }}>
                    {t.reviews.leaveReview}
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                      <Input
                        type="text"
                        placeholder={t.form.namePlaceholder}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-card border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {t.reviews.yourReview}
                      </label>
                      <Textarea
                        placeholder={t.reviews.reviewPlaceholder}
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        rows={4}
                        required
                        className="bg-card border-border resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow transition-all"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {t.reviews.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Reviews;
