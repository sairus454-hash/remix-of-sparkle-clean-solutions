import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  const handleClick = () => {
    import('@/lib/gtm')
      .then((m) =>
        m.gtmEvents.selectItem({
          item_id: title,
          item_name: title,
          action: 'open',
          location: 'service_card',
        }),
      )
      .catch(() => {});
  };

  return (
    <Card
      onClick={handleClick}
      className="group bg-card border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      <CardContent className="p-6">
        <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:shadow-md transition-all duration-300">
          <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
