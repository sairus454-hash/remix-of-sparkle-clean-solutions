import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  return (
    <Card className="group bg-gradient-card border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-gradient-hero group-hover:shadow-glow transition-all duration-300" style={{ animation: 'float 3s ease-in-out infinite' }}>
          <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
