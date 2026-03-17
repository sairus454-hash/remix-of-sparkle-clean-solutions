/**
 * Centralized image map using Vite's import.meta.glob.
 * Consolidates 100+ individual imports into a single module,
 * reducing module graph overhead and improving chunk splitting.
 */

const allImages = import.meta.glob<string>('/src/assets/**/*.jpg', {
  eager: true,
  import: 'default',
});

/** Resolve a short path like 'calc-pouf.jpg' or 'handyman/faucet.jpg' to its URL */
export function img(shortPath: string): string {
  return allImages[`/src/assets/${shortPath}`] ?? '';
}
