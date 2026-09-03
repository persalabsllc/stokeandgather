'use client';

import { useEffect, useState } from 'react';

const CONSENT_KEY = 'stoke-and-gather-marketing-consent';

export default function CookieConsent({ enabled }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (enabled && !window.localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, [enabled]);

  function choose(value) {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent('stoke-consent-changed', { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-consent" aria-label="Advertising measurement preference">
      <div>
        <strong>Help us improve the gathering.</strong>
        <p>With your permission, we use Meta advertising measurement to understand which Stoke & Gather ads and products are useful. You can decline and still use the site.</p>
      </div>
      <div className="cookie-actions">
        <button className="btn consent-decline" type="button" onClick={() => choose('declined')}>DECLINE</button>
        <button className="btn primary" type="button" onClick={() => choose('accepted')}>ALLOW</button>
      </div>
    </aside>
  );
}
