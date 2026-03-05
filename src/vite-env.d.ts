/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare namespace React {
  interface ImgHTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}
