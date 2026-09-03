import './globals.css';
import Attribution from '../components/Attribution';
import { CartProvider } from '../components/CartProvider';
import CookieConsent from '../components/CookieConsent';
import MetaPixel from '../components/MetaPixel';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stokeandgather.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Stoke & Gather | Fire Pit Weather Starts Here',
    template: '%s | Stoke & Gather',
  },
  description: 'Fire pits, outdoor cooking gear, patio comfort, and everything you need for unforgettable nights outside.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#151515',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
        <Attribution />
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        <CookieConsent enabled={Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID)} />
      </body>
    </html>
  );
}
