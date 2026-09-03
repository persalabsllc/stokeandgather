# Stoke & Gather

Stoke the fire. Gather your people.

This repository contains the Stoke & Gather Next.js storefront: a mobile-first outdoor-living shop built for direct product and collection traffic from Facebook and Instagram.

## Current storefront

- Branded homepage based on the approved charcoal, forest, ember, and cream design
- Responsive navigation and mobile menu
- Experience-led collections and curated launch catalog preview
- Product pages, search, persistent cart, and checkout handoff
- UTM and Facebook click-ID retention through checkout
- Consent-aware Meta Pixel support
- Shipping, returns, privacy, terms, about, and contact pages
- Local standalone logo and hero assets in `public/images`

The preview products are intentionally non-purchasable. The checkout route becomes live only after a Shopify catalog with real variant IDs is connected.

## Commerce architecture

Shopify is the catalog, checkout, payment, order, and fulfillment ledger. The Next.js storefront reads products with the Storefront API and creates a Shopify cart at checkout. Doba's native Shopify integration can then own catalog, inventory, price, order, and tracking synchronization for approved products. Suppliers without a supported feed or connector should remain in a manual exception queue rather than being presented as automated.

Copy `.env.example` to `.env.local` and set:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_STOREFRONT_API_VERSION`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_SITE_URL`

Never commit credentials.

## Development

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run build
```
