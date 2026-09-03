'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';

export default function CollectionBrowser({ products }) {
  const [sort, setSort] = useState('featured');
  const sorted = useMemo(() => {
    const next = [...products];
    if (sort === 'price-low') next.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') next.sort((a, b) => b.price - a.price);
    if (sort === 'name') next.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'featured') next.sort((a, b) => Number(b.featured) - Number(a.featured));
    return next;
  }, [products, sort]);

  return (
    <>
      <div className="collection-toolbar">
        <span>{products.length} {products.length === 1 ? 'item' : 'items'}</span>
        <label>
          Sort by
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
      <div className="product-grid">
        {sorted.map((product) => <ProductCard product={product} key={product.id} />)}
      </div>
    </>
  );
}
