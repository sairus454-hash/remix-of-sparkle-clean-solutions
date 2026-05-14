import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/i18n/LanguageContext';
import { getFaqs, getFaqTitle, type PageKey } from '@/lib/pageSeo';

interface PageFaqSectionProps {
  page: PageKey;
}

/**
 * Renders the localised FAQ accordion that mirrors the FAQPage JSON-LD
 * injected by each page's <SEO> tag. Keeps DOM and structured data in sync
 * so Google can show rich FAQ snippets.
 */
const PageFaqSection = ({ page }: PageFaqSectionProps) => {
  const { language } = useLanguage();
  const faqs = getFaqs(page, language);
  const title = getFaqTitle(language);

  return (
    <section className="py-16" aria-labelledby={`faq-${page}-heading`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2
            id={`faq-${page}-heading`}
            className="font-serif text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-fresh to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
            style={{ animation: 'shimmer 3s linear infinite' }}
          >
            {title}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${page}-${idx}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PageFaqSection;
