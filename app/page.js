import Image from 'next/image';
import Link from 'next/link';
import { Flame, MessageSquareText, ShieldCheck, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories } from '../lib/catalog';
import { getCatalogProducts } from '../lib/storefront';

const experiences = [
  ['Gather Around the Fire', 'Fire pits · Fire tables · Seating · Fire tools', '/collections/fire-pits'],
  ['Cook Over the Flame', 'Cast iron · Dutch ovens · Griddles · Pie irons · Pizza ovens', '/collections/cooking'],
  ['Make the Patio Comfortable', 'Heaters · Chairs · Tables · Blankets · Lighting', '/collections/heaters'],
  ['Take the Weekend Outside', 'Portable fire pits · Hammocks · Cooking gear · Coolers', '/collections/outdoor-living'],
];

export default async function Home() {
  const products = await getCatalogProducts();
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <>
      <section className="hero">
        <Image className="hero-image" src="/images/stoke-gather-hero.webp" alt="Friends gathered in Adirondack chairs around a backyard fire pit" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy shell">
          <p className="eyebrow">STOKE THE FIRE. GATHER YOUR PEOPLE.</p>
          <h1>FIRE PIT WEATHER<br />STARTS HERE.</h1>
          <p className="lede">Fire pits, outdoor cooking gear, and everything you need for unforgettable nights outside.</p>
          <div className="actions">
            <Link className="btn primary" href="/collections/fire-pits">SHOP FIRE PITS</Link>
            <Link className="btn ghost" href="/collections/cooking">SHOP COOKING</Link>
          </div>
        </div>
      </section>

      <section className="trust" aria-label="Store promises">
        <div><Truck /><span><b>U.S. WAREHOUSE FOCUS</b><small>Domestic fulfillment comes first</small></span></div>
        <div><ShieldCheck /><span><b>CURATED, NOT CROWDED</b><small>Useful gear chosen with care</small></span></div>
        <div><Flame /><span><b>COOK. GATHER. RELAX.</b><small>Everything for life outside</small></span></div>
        <div><MessageSquareText /><span><b>REAL PEOPLE. REAL SUPPORT.</b><small>We’re here when you need us</small></span></div>
      </section>

      <section className="categories shell" id="categories">
        <div className="section-kicker"><span />SHOP BY CATEGORY<span /></div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link className="category" href={`/collections/${category.slug}`} key={category.slug}>
              <Image src={category.image} alt={category.name} fill sizes="(max-width: 650px) 50vw, (max-width: 1050px) 33vw, 17vw" />
              <div className="category-overlay" />
              <h2>{category.name}</h2>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-products shell" id="featured">
        <div className="section-heading">
          <div><p className="eyebrow dark">THE FIRST FIRE</p><h2>GEAR WORTH GATHERING AROUND.</h2></div>
          <p>A tight launch collection built around products that do more than sit on a patio—they give people a reason to use it.</p>
        </div>
        <div className="product-grid">{featured.map((product) => <ProductCard product={product} key={product.id} />)}</div>
      </section>

      <section className="story shell">
        <div><p className="eyebrow dark">BUILT FOR THE BEST KIND OF WEATHER</p><h2>COOL AIR. HOT FOOD.<br />GOOD COMPANY.</h2></div>
        <p>Stoke & Gather is for evenings when nobody wants to go inside. Fire going, cast iron on the grate, something cold in your hand, and your favorite people close by. We source outdoor gear that makes those nights easier to create—and harder to leave.</p>
      </section>

      <section className="experience-section">
        <div className="shell experience-layout">
          <div className="experience-intro"><p className="eyebrow">SHOP THE FEELING</p><h2>OUTSIDE IS THE<br />WHOLE POINT.</h2><p>Start with the kind of night you want. We’ll help you find the gear that makes it happen.</p></div>
          <div className="experience-list">
            {experiences.map(([title, description, href], index) => (
              <Link href={href} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><b>→</b></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="launch-callout">
        <div className="shell">
          <p className="eyebrow">THE LAUNCH COLLECTION</p><h2>THE GOOD STUFF IS ALMOST HERE.</h2>
          <p>We’re verifying U.S. inventory, delivery terms, and the first products now. Browse the preview, build a cart, and see what’s coming around the fire.</p>
          <div className="actions"><Link className="btn primary" href="/collections/fire-pits">BROWSE THE COLLECTION</Link><a className="btn ghost" href="mailto:hello@stokeandgather.com?subject=Stoke%20%26%20Gather%20launch%20updates">GET LAUNCH UPDATES</a></div>
        </div>
      </section>
    </>
  );
}
