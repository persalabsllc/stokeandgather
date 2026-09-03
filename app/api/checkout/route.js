import { NextResponse } from 'next/server';

export async function POST(request) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2026-07';

  if (!domain || !token) {
    return NextResponse.json({
      message: 'The launch catalog is still being connected. Checkout will open after U.S. warehouse inventory and delivery terms are verified.',
    }, { status: 503 });
  }

  const { lines = [], attributes = [] } = await request.json();
  const validLines = lines.filter((line) => line.merchandiseId && Number.isInteger(line.quantity) && line.quantity > 0);
  const validAttributes = attributes
    .filter((attribute) => typeof attribute?.key === 'string' && typeof attribute?.value === 'string')
    .slice(0, 10)
    .map((attribute) => ({ key: attribute.key.slice(0, 100), value: attribute.value.slice(0, 500) }));
  if (!validLines.length) {
    return NextResponse.json({ message: 'These preview items are not connected to live inventory yet.' }, { status: 400 });
  }

  const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query: `mutation CreateCart($input: CartInput!) { cartCreate(input: $input) { cart { checkoutUrl } userErrors { field message } } }`,
      variables: { input: { lines: validLines, attributes: validAttributes } },
    }),
    cache: 'no-store',
  });

  const payload = await response.json();
  const error = payload.errors?.[0]?.message || payload.data?.cartCreate?.userErrors?.[0]?.message;
  if (!response.ok || error || !payload.data?.cartCreate?.cart?.checkoutUrl) {
    return NextResponse.json({ message: error || 'Secure checkout could not be opened.' }, { status: 502 });
  }

  return NextResponse.json({ checkoutUrl: payload.data.cartCreate.cart.checkoutUrl });
}
