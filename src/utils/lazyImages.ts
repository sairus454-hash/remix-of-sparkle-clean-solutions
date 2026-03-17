/**
 * Lazy image resolver using Vite's import.meta.glob.
 * Images are NOT loaded at module init time — they're resolved on demand.
 */

const imageLoaders = import.meta.glob<string>(
  '/src/assets/**/*.jpg',
  { import: 'default', query: '?url' }
);

const resolvedCache = new Map<string, string>();
const pendingLoads = new Map<string, Promise<string>>();

/**
 * Get the resolved URL for an asset image by its short path (e.g. 'calc-pouf.jpg' or 'handyman/faucet.jpg').
 * Returns cached URL if already resolved, otherwise returns '' and triggers async load.
 */
export function getImageUrl(shortPath: string): string {
  if (resolvedCache.has(shortPath)) return resolvedCache.get(shortPath)!;
  // Trigger async load if not already in progress
  if (!pendingLoads.has(shortPath)) {
    loadImage(shortPath);
  }
  return '';
}

/**
 * Preload a batch of images by their short paths. Returns when all are resolved.
 */
export async function preloadImages(shortPaths: string[]): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  await Promise.all(
    shortPaths.map(async (sp) => {
      results[sp] = await loadImage(sp);
    })
  );
  return results;
}

async function loadImage(shortPath: string): Promise<string> {
  if (resolvedCache.has(shortPath)) return resolvedCache.get(shortPath)!;
  if (pendingLoads.has(shortPath)) return pendingLoads.get(shortPath)!;

  const fullKey = `/src/assets/${shortPath}`;
  const loader = imageLoaders[fullKey];
  if (!loader) {
    console.warn(`[lazyImages] No loader for: ${fullKey}`);
    resolvedCache.set(shortPath, '');
    return '';
  }

  const promise = loader().then((url) => {
    resolvedCache.set(shortPath, url);
    pendingLoads.delete(shortPath);
    return url;
  });
  pendingLoads.set(shortPath, promise);
  return promise;
}
