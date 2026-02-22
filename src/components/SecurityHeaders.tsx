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
      content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https: http:; connect-src 'self' https://*.supabase.co https://api.telegram.org wss://*.supabase.co; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    />
    {/* Prevent clickjacking */}
    <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
    {/* Referrer policy */}
    <meta name="referrer" content="strict-origin-when-cross-origin" />
  </Helmet>
);

export default SecurityHeaders;
