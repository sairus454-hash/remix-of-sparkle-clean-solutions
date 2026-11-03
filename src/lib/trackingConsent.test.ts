import { beforeEach, describe, expect, it, vi } from 'vitest';
import { canTrack, CONSENT_KEY, NOTICE_VERSION, readConsent, requiresConsent, saveConsent } from './trackingConsent';
import { ADS_ID, ADS_LEAD_LABEL, ADS_PHONE_LABEL, sendAdsConversion, refreshTracking } from './googleTracking';
describe('agreed basic consent route', () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear(); window.gtag = vi.fn(); window.dataLayer = []; });
  it('blocks Polish and unknown regions before acceptance', () => {
    expect(requiresConsent('PL')).toBe(true);
    expect(requiresConsent('UNKNOWN')).toBe(true);
    expect(canTrack('advertising')).toBe(false);
    sendAdsConversion(); expect(window.gtag).not.toHaveBeenCalled();
  });
  it('records notice evidence and allows accepted advertising', () => {
    saveConsent(true, false, 'pl');
    expect(canTrack('advertising')).toBe(true);
    expect(canTrack('analytics')).toBe(false);
    expect(readConsent()?.history[0].version).toBe(NOTICE_VERSION);
    expect(readConsent()?.history[0].notice).toContain('Google Ads');
  });
  it('withdrawal preserves prior acceptance and blocks new conversions', () => {
    saveConsent(true, true, 'pl'); saveConsent(false, false, 'pl');
    expect(JSON.parse(localStorage.getItem(CONSENT_KEY) || '{}').history.map((c: { advertising: boolean }) => c.advertising)).toEqual([true, false]);
    sendAdsConversion(); expect(window.gtag).not.toHaveBeenCalled();
  });
  it('keeps form and phone destinations distinct in the verified account', () => {
    expect(ADS_ID).toBe('AW-17379470297');
    expect(ADS_LEAD_LABEL).toBe('AW-17379470297/r2XtCMGYjoIcENnXlt9A');
    expect(ADS_PHONE_LABEL).toBe('AW-17379470297/2gVCCMP0-4EcENnXlt9A');
  });
  it('never replays a conversion blocked before acceptance', () => {
    sendAdsConversion(); saveConsent(true, true, 'pl');
    expect(window.gtag).not.toHaveBeenCalled();
  });
  it('queues commands in the Arguments format consumed by the Google tag', () => {
    window.gtag = undefined;
    saveConsent(true, false, 'pl');
    refreshTracking();
    sendAdsConversion();
    const command = window.dataLayer.find(entry => entry[0] === 'event' && entry[1] === 'conversion');
    expect(Object.prototype.toString.call(command)).toBe('[object Arguments]');
    expect(command?.[2]).toEqual({ send_to: 'AW-17379470297/r2XtCMGYjoIcENnXlt9A' });
  });
});