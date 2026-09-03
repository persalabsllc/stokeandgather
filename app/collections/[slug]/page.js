import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CollectionBrowser from '../../../components/CollectionBrowser';
import { categories, getCategory } from '../../../lib/catalog';
import { getCatalogProducts } from '../../../lib/storefront';

export function generateStaticParams() { return categories.map((category) => ({ slug: category.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const products = (await getCatalogProducts()).filter((product) => product.categorySlugs.includes(slug));
  return (
    <>
      <section className="collection-hero">
        <Image src={category.image} alt="" fill priority sizes="100vw" /><div className="collection-hero-shade" />
        <div className="shell collection-hero-copy"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{category.shortName}</span></div><p className="eyebrow">STOKE & GATHER COLLECTION</p><h1>{category.name}</h1><p>{category.description}</p></div>
      </section>
      <section className="collection-content shell"><CollectionBrowser products={products} /></section>
    </>
  );
}
