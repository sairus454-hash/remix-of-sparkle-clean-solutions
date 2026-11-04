# Architecture rules
- Generate crawler blog titles/descriptions from the frontend article source with `blogSeoMetaPlugin`; keep social-preview crawler recognition aligned in middleware and the edge renderer so shared links retain their own identity.
- Own Google Ads/Analytics loading and event reporting in the consent-aware tracking modules; do not load GTM alongside direct tags, so refusal blocks transmission and conversions have one reporting path.
- Isolate optional geolocation loading with an error boundary so a failed deferred import cannot blank the visible page.
- Keep city data, localized search identity and local content shared between React and the crawler renderer under `seo-prerender/city`; frontend data modules re-export these sources to prevent city/homepage divergence.
- Share localized homepage title/description between React and the crawler renderer through `seo-prerender/homeMeta`; keep the static Polish head fallback aligned to prevent divergent search metadata.
- Keep contact-page address, geo coordinates and map destination in `businessLocation` so visible contact details and structured data cannot diverge.
- All automatic order discounts must be calculated by `useDiscountCalculator`; presentation and chat must not independently calculate category-combination discounts, so totals remain consistent.
- Keep the existing sitemap plugin; never derive lastmod from build time or publication-date fallbacks, because it must reflect significant page-specific content changes.
- Build the auto-seat ozone-gift quick order through `createAutoSeatPromoOrder` so its stored total and seat price cannot diverge; automatic discounts remain exclusively in `useDiscountCalculator`.