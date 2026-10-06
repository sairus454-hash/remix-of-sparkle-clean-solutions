# Architecture rules
- All automatic order discounts must be calculated by `useDiscountCalculator`; presentation and chat must not independently calculate category-combination discounts, so totals remain consistent.
- Keep the existing sitemap plugin; never derive lastmod from build time or publication-date fallbacks, because it must reflect significant page-specific content changes.