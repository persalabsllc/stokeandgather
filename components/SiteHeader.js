'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './CartProvider';

const navItems = [
  ['Fire Pits', '/collections/fire-pits'],
  ['Cooking', '/collections/cooking'],
  ['Furniture', '/collections/furniture'],
  ['Heaters', '/collections/heaters'],
  ['Outdoor Living', '/collections/outdoor-living'],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <div className="announcement">COOL NIGHTS ARE COMING — FIRE PIT WEATHER STARTS HERE</div>
      <header className="site-header">
        <div className="shell nav-shell">
          <button className="icon-button mobile-menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
          <Link className="brand" href="/" aria-label="Stoke and Gather home">
            <Image src="/images/stoke-logo-header.svg" alt="Stoke & Gather" width={560} height={150} priority />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            <Link className="sale-link" href="/#featured">Launch Picks</Link>
          </nav>
          <div className="nav-actions">
            <Link className="icon-button search-link" href="/search" aria-label="Search"><Search /></Link>
            <Link className="icon-button account-link" href="/pages/contact" aria-label="Contact support"><UserRound /></Link>
            <Link className="icon-button cart-link" href="/cart" aria-label={`Cart with ${count} items`}>
              <ShoppingCart />
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
            <Link href="/search" onClick={() => setOpen(false)}>Search</Link>
            <Link href="/#featured" onClick={() => setOpen(false)}>Launch Picks</Link>
          </nav>
        )}
      </header>
    </>
  );
}
