import Image from 'next/image';
import Link from 'next/link';
import { Check, PackageCheck, RefreshCcw, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import AddToCart from '../../../components/AddToCart';
import ProductCard from '../../../components/ProductCard';
import { formatPrice, previewProducts } from '../../../lib/catalog';
import { getCatalogProducts, getProduct } from '../../../lib/storefront';

export function generateStaticParams() { return previewProducts.map((product) => ({ slug: product.handle })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const related = (await getCatalogProducts()).filter((candidate) => candidate.id !== product.id && candidate.categorySlugs.some((category) => product.categorySlugs.includes(category))).slice(0, 4);
  const cartProduct = { id: product.id, handle: product.handle, name: product.name, price: product.price, currencyCode: product.currencyCode || 'USD', image: product.image, imageAlt: product.imageAlt, variantId: product.variantId, preview: product.preview };
  return (
    <>
      <section className="product-page shell">
        <div className="breadcrumbs product-breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href={`/collections/${product.categorySlugs[0]}`}>Collection</Link><span>/</span><span>{product.name}</span></div>
        <div className="product-layout">
          <div className="product-gallery"><Image src={product.image} alt={product.imageAlt} fill priority sizes="(max-width: 850px) 100vw, 56vw" />{product.badge && <span className="product-badge large-badge">{product.badge}</span>}</div>
          <div className="product-info">
            <p className="eyebrow dark">STOKE & GATHER LAUNCH COLLECTION</p><h1>{product.name}</h1><p className="product-tagline">{product.tagline}</p>
            <div className="product-price"><strong>{formatPrice(product.price, product.currencyCode)}</strong>{product.compareAtPrice && <s>{formatPrice(product.compareAtPrice, product.currencyCode)}</s>}</div>
            <p className="product-description">{product.description}</p>
            {product.details.length > 0 && <ul className="product-details">{product.details.map((detail) => <li key={detail}><Check />{detail}</li>)}</ul>}
            <AddToCart product={cartProduct} />
            <div className="product-assurances"><div><PackageCheck /><span><b>U.S. fulfillment first</b><small>Delivery estimates shown before purchase</small></span></div><div><RefreshCcw /><span><b>Clear return terms</b><small>Item-specific details before checkout</small></span></div><div><ShieldCheck /><span><b>Secure checkout</b><small>Powered by the connected commerce platform</small></span></div></div>
          </div>
        </div>
      </section>
      {related.length > 0 && <section className="related-products shell"><div className="section-kicker"><span />KEEP THE FIRE GOING<span /></div><div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></section>}
    </>
  );
}
