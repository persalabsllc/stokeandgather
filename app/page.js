import { Search, UserRound, ShoppingCart, Truck, ShieldCheck, Flame, MessageSquareText, ChevronDown } from 'lucide-react';

const categories = [
  ['Fire Pits & Fire Tables','https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85'],
  ['Outdoor Cooking','https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=85'],
  ['Pizza Ovens & Grills','https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85'],
  ['Outdoor Furniture','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85'],
  ['Heaters & Lighting','https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85'],
  ['Outdoor Living','https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=900&q=85'],
];

export default function Home() {
  return (
    <main>
      <div className="announcement">COOL NIGHTS ARE COMING — FIRE PIT WEATHER STARTS HERE</div>
      <header className="nav shell">
        <a className="brand" href="#"><img src="/stoke-logo.svg" alt="Stoke & Gather" /></a>
        <nav>
          {['Fire Pits','Cooking','Furniture','Heaters'].map((item)=><a href="#categories" key={item}>{item}<ChevronDown size={14}/></a>)}
          <a href="#categories">Outdoor Living</a><a href="#featured">Sale</a>
        </nav>
        <div className="nav-icons"><Search/><UserRound/><ShoppingCart/></div>
      </header>

      <section className="hero">
        <img className="hero-image" src="https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=2000&q=90" alt="Friends gathered around a fire outdoors" />
        <div className="hero-shade" />
        <div className="hero-copy shell">
          <p className="eyebrow">STOKE THE FIRE. GATHER YOUR PEOPLE.</p>
          <h1>FIRE PIT WEATHER<br/>STARTS HERE.</h1>
          <p className="lede">Fire pits, outdoor cooking gear, and everything you need for unforgettable nights outside.</p>
          <div className="actions"><a className="btn primary" href="#categories">SHOP FIRE PITS</a><a className="btn ghost" href="#categories">SHOP COOKING</a></div>
        </div>
      </section>

      <section className="trust">
        <div><Truck/><span><b>FAST U.S. SHIPPING</b><small>Most orders ship in 2–3 business days</small></span></div>
        <div><ShieldCheck/><span><b>QUALITY YOU CAN TRUST</b><small>Carefully sourced. Built to last.</small></span></div>
        <div><Flame/><span><b>COOK. GATHER. RELAX.</b><small>Everything for life outside.</small></span></div>
        <div><MessageSquareText/><span><b>REAL PEOPLE. REAL SUPPORT.</b><small>We're here to help.</small></span></div>
      </section>

      <section className="categories shell" id="categories">
        <div className="section-kicker"><span/>SHOP BY CATEGORY<span/></div>
        <div className="category-grid">
          {categories.map(([name,img]) => <a className="category" href="#featured" key={name}><img src={img} alt={name}/><div className="category-overlay"/><h3>{name}</h3></a>)}
        </div>
      </section>

      <section className="story shell">
        <div><p className="eyebrow dark">BUILT FOR THE BEST KIND OF WEATHER</p><h2>COOL AIR. HOT FOOD.<br/>GOOD COMPANY.</h2></div>
        <p>Stoke & Gather is for evenings when nobody wants to go inside. Fire going, cast iron on the grate, something cold in your hand and your favorite people close by. We source outdoor gear that makes those nights easier to create — and harder to leave.</p>
      </section>

      <section className="featured" id="featured"><div className="shell"><p className="eyebrow">COMING SOON</p><h2>THE FIRST STOKE & GATHER COLLECTION</h2><p>Smokeless fire pits, fire tables, pizza ovens, cast iron, outdoor cooking gear and gathering-ready furniture are being curated now.</p><a className="btn primary" href="mailto:hello@stokeandgather.com">GET LAUNCH UPDATES</a></div></section>

      <footer><div className="shell footer-grid"><div><img src="/stoke-logo.svg" alt="Stoke & Gather"/><p>Stoke the fire. Gather your people.</p></div><div><b>SHOP</b><a href="#categories">Fire Pits</a><a href="#categories">Outdoor Cooking</a><a href="#categories">Furniture</a></div><div><b>HELP</b><a href="mailto:hello@stokeandgather.com">Contact</a><a href="#">Shipping</a><a href="#">Returns</a></div></div><div className="copyright">© 2026 Stoke & Gather. All rights reserved.</div></footer>
    </main>
  );
}
