export const BUSINESS_LOCATION = {
  streetAddress: 'ul. Jedności Narodowej 160',
  postalCode: '50-302',
  city: 'Wrocław',
  latitude: 51.1263654,
  longitude: 17.0469796,
} as const;

export const BUSINESS_ADDRESS = `${BUSINESS_LOCATION.streetAddress}, ${BUSINESS_LOCATION.postalCode} ${BUSINESS_LOCATION.city}`;

export const BUSINESS_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS)}`;