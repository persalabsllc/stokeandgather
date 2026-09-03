import Image from 'next/image';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/images/stoke-logo-header.svg" alt="Stoke & Gather" width={560} height={150} />
          <p>Stoke the fire. Gather your people.</p>
          <small>Outdoor gear chosen for cool air, hot food, and good company.</small>
        </div>
        <div>
          <b>SHOP</b>
          <Link href="/collections/fire-pits">Fire Pits</Link>
          <Link href="/collections/cooking">Outdoor Cooking</Link>
          <Link href="/collections/furniture">Furniture</Link>
          <Link href="/collections/heaters">Heaters & Lighting</Link>
        </div>
        <div>
          <b>STOKE & GATHER</b>
          <Link href="/pages/about">Our Story</Link>
          <Link href="/pages/shipping-returns">Shipping & Returns</Link>
          <Link href="/pages/contact">Contact</Link>
        </div>
        <div>
          <b>POLICIES</b>
          <Link href="/pages/privacy">Privacy</Link>
          <Link href="/pages/terms">Terms</Link>
        </div>
      </div>
      <div className="copyright">© 2026 Stoke & Gather. All rights reserved.</div>
    </footer>
  );
}
