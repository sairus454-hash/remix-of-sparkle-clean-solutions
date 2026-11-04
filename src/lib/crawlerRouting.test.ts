import { afterEach, describe, expect, it, vi } from 'vitest';
import middleware from '../../middleware';

afterEach(() => vi.unstubAllGlobals());

describe('Social crawler routing', () => {
  it.each(['facebookexternalhit/1.1', 'meta-externalfetcher/1.1', 'Discordbot/2.0', 'SkypeUriPreview'])('forwards the localized route for %s', async agent => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('route html', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const response = await middleware(new Request('https://masterclean1885.com/ru/auto', {
      headers: { 'user-agent': agent },
    }));
    const target = new URL(fetchMock.mock.calls[0][0]);
    expect(target.searchParams.get('path')).toBe('/ru/auto');
    expect(target.searchParams.get('_prerender')).toBe('1');
    expect(response?.status).toBe(200);
    expect(await response?.text()).toBe('route html');
  });
  it('retains the successful SPA fallback when the crawler renderer is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('unreachable')));
    expect(await middleware(new Request('https://masterclean1885.com/auto', {
      headers: { 'user-agent': 'Googlebot' },
    }))).toBeUndefined();
  });
});