/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.mp4' {
  const src: string;
  export default src;
}

interface Window {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
  gtag_report_conversion?: (url?: string) => boolean;
}

declare namespace React {
  interface ImgHTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}
