'use client';

import Link from 'next/link';
import { Check, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './CartProvider';

export default function AddToCart({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        currency: product.currencyCode || 'USD',
        value: product.price,
      });
    }
  }

  return (
    <div className="product-actions">
      <button className="btn primary add-button" type="button" onClick={handleAdd}>
        {added ? <><Check /> ADDED TO CART</> : <><ShoppingBag /> ADD TO CART</>}
      </button>
      {added && <Link className="text-link" href="/cart">View cart</Link>}
      {product.preview && <p className="catalog-disclaimer">Catalog preview only. Final specifications, pricing, availability, and delivery terms will be confirmed before checkout opens.</p>}
    </div>
  );
}
