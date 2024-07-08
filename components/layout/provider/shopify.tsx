'use client';

import { CartProvider, ShopifyProvider, useShopifyCookies } from '@shopify/hydrogen-react';

type LayoutProviderShopifyProps = {
  children: React.ReactNode;
};

export default function LayoutProviderShopify({ children }: LayoutProviderShopifyProps) {
  useShopifyCookies();

  return (
    <ShopifyProvider
      storeDomain={process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string}
      storefrontToken={process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string}
      storefrontApiVersion="2024-04"
      languageIsoCode="EN"
      countryIsoCode="US"
    >
      <CartProvider>{children}</CartProvider>
    </ShopifyProvider>
  );
}
