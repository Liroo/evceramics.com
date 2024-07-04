import { createStorefrontClient } from '@shopify/hydrogen-react';
export const client = createStorefrontClient({
  // load environment variables according to your framework and runtime
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});
