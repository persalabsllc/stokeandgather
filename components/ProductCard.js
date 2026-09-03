import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '../lib/catalog';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link className="product-image-wrap" href={`/products/${product.handle}`}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 650px) 50vw, (max-width: 1050px) 33vw, 25vw"
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </Link>
      <div className="product-card-body">
        <Link href={`/products/${product.handle}`}><h3>{product.name}</h3></Link>
        <p>{product.tagline}</p>
        <div className="price-row">
          <strong>{formatPrice(product.price, product.currencyCode)}</strong>
          {product.compareAtPrice && <s>{formatPrice(product.compareAtPrice, product.currencyCode)}</s>}
        </div>
        {product.preview && <small className="preview-note">Launch catalog preview</small>}
      </div>
    </article>
  );
}
