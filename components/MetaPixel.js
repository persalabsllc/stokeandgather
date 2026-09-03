'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MetaPixel({ pixelId }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const readConsent = (event) => setConsented((event?.detail || window.localStorage.getItem('stoke-and-gather-marketing-consent')) === 'accepted');
    readConsent();
    window.addEventListener('stoke-consent-changed', readConsent);
    return () => window.removeEventListener('stoke-consent-changed', readConsent);
  }, []);

  useEffect(() => {
    if (ready && window.fbq) window.fbq('track', 'PageView');
  }, [pathname, ready]);

  if (!pixelId || !consented) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      onReady={() => setReady(true)}
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');`,
      }}
    />
  );
}
