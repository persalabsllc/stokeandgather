'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { formatPrice } from '../lib/catalog';
import { useCart } from './CartProvider';

export default function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function checkout() {
    setLoading(true);
    setMessage('');
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_ids: items.map((item) => item.id),
        currency: items[0]?.currencyCode || 'USD',
        value: subtotal,
        num_items: items.reduce((sum, item) => sum + item.quantity, 0),
      });
    }

    try {
      let attributes = [];
      try {
        const attribution = JSON.parse(window.localStorage.getItem('stoke-and-gather-attribution') || 'null');
        attributes = Object.entries(attribution?.last || attribution?.first || {}).map(([key, value]) => ({ key, value }));
      } catch {}
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines: items.map((item) => ({ merchandiseId: item.variantId, quantity: item.quantity })), attributes }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || 'Checkout is not available yet.');
      window.location.assign(payload.checkoutUrl);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <section className="empty-cart shell">
        <span className="eyebrow dark">YOUR CART</span>
        <h1>The fire needs a first log.</h1>
        <p>Your cart is empty. Start with the gear built to bring everybody outside.</p>
        <Link className="btn primary" href="/#featured">SHOP THE LAUNCH PICKS</Link>
      </section>
    );
  }

  return (
    <section className="cart-page shell">
      <div className="page-heading compact-heading">
        <span className="eyebrow dark">YOUR CART</span>
        <h1>READY FOR THE NEXT GOOD NIGHT.</h1>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-thumb"><Image src={item.image} alt={item.imageAlt} fill sizes="120px" /></div>
              <div className="cart-item-copy">
                <Link href={`/products/${item.handle}`}><h2>{item.name}</h2></Link>
                <p>{formatPrice(item.price, item.currencyCode)}</p>
                <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                  <button onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus /></button>
                </div>
              </div>
              <div className="cart-item-end">
                <strong>{formatPrice(item.price * item.quantity, item.currencyCode)}</strong>
                <button className="remove-button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}><Trash2 /></button>
              </div>
            </article>
          ))}
        </div>
        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div><span>Subtotal</span><strong>{formatPrice(subtotal, items[0]?.currencyCode)}</strong></div>
          <p>Shipping and taxes are calculated at secure checkout.</p>
          <button className="btn primary checkout-button" onClick={checkout} disabled={loading}>
            {loading ? 'OPENING CHECKOUT…' : <>CHECKOUT <ArrowRight /></>}
          </button>
          {message && <div className="checkout-message" role="status">{message}</div>}
          <small>Checkout will open when verified supplier inventory is connected. Nothing in the preview catalog can be purchased yet.</small>
        </aside>
      </div>
    </section>
  );
}
