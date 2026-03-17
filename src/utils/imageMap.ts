/**
 * Centralized image map for CityPage calculator items.
 * Uses import.meta.glob to consolidate 100+ individual imports
 * into a single module, improving chunk splitting and reducing
 * module graph overhead.
 */

const calcImages = import.meta.glob<string>('/src/assets/calc-*.jpg', {
  eager: true,
  import: 'default',
});

const handymanImages = import.meta.glob<string>('/src/assets/handyman/*.jpg', {
  eager: true,
  import: 'default',
});

const ozoneImages = import.meta.glob<string>('/src/assets/ozone-*.jpg', {
  eager: true,
  import: 'default',
});

const windowImages = import.meta.glob<string>('/src/assets/window-cleaning-*.jpg', {
  eager: true,
  import: 'default',
});

const heroCleaningImages = import.meta.glob<string>('/src/assets/hero-house-cleaning*.jpg', {
  eager: true,
  import: 'default',
});

const allImages: Record<string, string> = {
  ...calcImages,
  ...handymanImages,
  ...ozoneImages,
  ...windowImages,
  ...heroCleaningImages,
};

/** Resolve a short path like 'calc-pouf.jpg' or 'handyman/faucet.jpg' to its URL */
export function img(shortPath: string): string {
  return allImages[`/src/assets/${shortPath}`] ?? '';
}
