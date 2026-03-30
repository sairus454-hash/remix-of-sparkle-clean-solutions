import { Helmet } from 'react-helmet-async';

/**
 * Security headers applied globally via meta tags.
 * Note: For full CSP/X-Frame-Options enforcement, configure these
 * as HTTP headers on your hosting provider (e.g., Cloudflare).
 * Meta tags provide a baseline defense layer.
 */
const SecurityHeaders = () => (
  <Helmet>
    {/* Content Security Policy */}
    <meta
      httpEquiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.googletagmanager.com https://*.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https: http:; connect-src 'self' https://*.supabase.co https://api.telegram.org wss://*.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://www.google.com; frame-src https://www.googletagmanager.com https://bid.g.doubleclick.net https://td.doubleclick.net; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    />
    {/* Prevent clickjacking */}
    <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
    {/* Referrer policy */}
    <meta name="referrer" content="strict-origin-when-cross-origin" />
  </Helmet>
);

export default SecurityHeaders;
