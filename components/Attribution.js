'use client';

import { useEffect } from 'react';

const STORAGE_KEY = 'stoke-and-gather-attribution';
const TRACKED_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];

export default function Attribution() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const touch = Object.fromEntries(TRACKED_KEYS.map((key) => [key, params.get(key)]).filter(([, value]) => value));
    if (!Object.keys(touch).length) return;

    try {
      const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        first: existing?.first || touch,
        last: touch,
        updatedAt: new Date().toISOString(),
      }));
    } catch {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ first: touch, last: touch, updatedAt: new Date().toISOString() }));
    }
  }, []);

  return null;
}
