# Architecture rules
- Keep contact-page address, geo coordinates and map destination in `businessLocation` so visible contact details and structured data cannot diverge.
- All automatic order discounts must be calculated by `useDiscountCalculator`; presentation and chat must not independently calculate category-combination discounts, so totals remain consistent.
- Keep the existing sitemap plugin; never derive lastmod from build time or publication-date fallbacks, because it must reflect significant page-specific content changes.
- Build the auto-seat ozone-gift quick order through `createAutoSeatPromoOrder` so its stored total and seat price cannot diverge; automatic discounts remain exclusively in `useDiscountCalculator`.