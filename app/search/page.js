import ProductCard from '../../components/ProductCard';
import { getCatalogProducts } from '../../lib/storefront';
export const metadata = { title: 'Search' };
export default async function SearchPage({ searchParams }) {
  const { q = '' } = await searchParams;
  const query = q.trim().toLowerCase();
  const products = await getCatalogProducts();
  const results = query ? products.filter((product) => [product.name, product.description, product.tagline, ...product.categorySlugs].join(' ').toLowerCase().includes(query)) : [];
  return (
    <section className="search-page shell">
      <div className="page-heading compact-heading"><span className="eyebrow dark">FIND YOUR NEXT GOOD NIGHT</span><h1>SEARCH THE COLLECTION</h1></div>
      <form className="search-form" action="/search"><label htmlFor="site-search">What are you gathering around?</label><div><input id="site-search" name="q" defaultValue={q} placeholder="Try fire pit, pizza oven, cast iron…" autoFocus /><button className="btn primary" type="submit">SEARCH</button></div></form>
      {query && <p className="search-count">{results.length} {results.length === 1 ? 'result' : 'results'} for “{q}”</p>}
      {results.length > 0 && <div className="product-grid">{results.map((product) => <ProductCard product={product} key={product.id} />)}</div>}
      {query && results.length === 0 && <div className="no-results"><h2>Nothing around that fire yet.</h2><p>Try a broader search or browse the launch collection.</p></div>}
    </section>
  );
}
