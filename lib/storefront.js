import { previewProducts } from './catalog';

const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '');
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2026-07';

export const shopifyConfigured = Boolean(domain && token);

async function shopifyRequest(query, variables = {}) {
  if (!shopifyConfigured) return null;

  const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });

  if (!response.ok) throw new Error(`Shopify Storefront API returned ${response.status}`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors[0].message);
  return payload.data;
}

function categorySlugsFromProduct(product) {
  const allowed = new Set(['fire-pits', 'cooking', 'pizza-ovens', 'furniture', 'heaters', 'outdoor-living']);
  const values = [...(product.tags || []), product.productType || '']
    .map((value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'))
    .filter((value) => allowed.has(value));
  return values.length ? [...new Set(values)] : ['outdoor-living'];
}

function normalizeShopifyProduct(product) {
  const variant = product.variants.nodes[0];
  const amount = Number(variant?.price?.amount || product.priceRange.minVariantPrice.amount);
  const compareAt = variant?.compareAtPrice?.amount ? Number(variant.compareAtPrice.amount) : null;

  return {
    id: product.id,
    handle: product.handle,
    name: product.title,
    price: amount,
    currencyCode: variant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode,
    compareAtPrice: compareAt,
    categorySlugs: categorySlugsFromProduct(product),
    image: product.featuredImage?.url || '/images/product-placeholder.jpg',
    imageAlt: product.featuredImage?.altText || product.title,
    badge: product.tags?.find((tag) => tag.toLowerCase().startsWith('badge:'))?.split(':').slice(1).join(':').trim() || null,
    tagline: product.seo?.description || product.description?.split('\n')[0] || '',
    description: product.description || '',
    details: [],
    featured: product.tags?.some((tag) => tag.toLowerCase() === 'featured'),
    preview: false,
    availableForSale: Boolean(variant?.availableForSale),
    variantId: variant?.id || null,
  };
}

export async function getCatalogProducts() {
  if (!shopifyConfigured) return previewProducts;

  try {
    const data = await shopifyRequest(`
      query StokeCatalog {
        products(first: 50, sortKey: BEST_SELLING) {
          nodes {
            id
            handle
            title
            description
            productType
            tags
            seo { description }
            featuredImage { url altText width height }
            priceRange { minVariantPrice { amount currencyCode } }
            variants(first: 1) {
              nodes {
                id
                availableForSale
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
              }
            }
          }
        }
      }
    `);
    return data.products.nodes.map(normalizeShopifyProduct);
  } catch (error) {
    console.error('Shopify catalog unavailable; serving the preview catalog.', error);
    return previewProducts;
  }
}

export async function getProduct(handle) {
  const products = await getCatalogProducts();
  return products.find((product) => product.handle === handle);
}
