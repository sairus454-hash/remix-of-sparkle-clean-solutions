import { describe, expect, it } from 'vitest';
import { BUSINESS_ADDRESS, BUSINESS_LOCATION, BUSINESS_MAP_URL } from './businessLocation';

describe('company contact location', () => {
  it('uses Jedności Narodowej 160, 50-302 Wrocław for the map destination', () => {
    expect(BUSINESS_ADDRESS).toBe('ul. Jedności Narodowej 160, 50-302 Wrocław');
    expect(new URL(BUSINESS_MAP_URL).searchParams.get('query')).toBe('ul. Jedności Narodowej 160, 50-302 Wrocław');
  });

  it('locates the verified building instead of the old Trawowa address', () => {
    expect(BUSINESS_LOCATION.latitude).toBe(51.1263654);
    expect(BUSINESS_LOCATION.longitude).toBe(17.0469796);
  });
});