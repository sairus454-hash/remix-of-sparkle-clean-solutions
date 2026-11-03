import { useEffect } from 'react';
import { initializeTracking } from '@/lib/googleTracking';
export default function GoogleTracking() {
  useEffect(initializeTracking, []);
  return null;
}