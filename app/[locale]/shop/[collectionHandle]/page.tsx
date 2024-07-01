import Intro from 'components/intro';
import { getCollectionProducts, getMenu } from 'lib/shopify';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
};

export default async function ShopPage({
  params: { locale, collectionHandle },
}: {
  params: { locale: string; collectionHandle: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  unstable_setRequestLocale(locale);
  const menu = await getMenu('shop', locale.toUpperCase());
  const shopMenu = menu.map((item) => ({
    ...item,
    handle: item.path.replace('/collections/', ''),
  }));

  if (!shopMenu.some((item) => item.handle === collectionHandle)) {
    return notFound();
  }

  // Get all products from the collection
  const collectionProducts = await getCollectionProducts({
    collection: collectionHandle,
    locale: locale.toUpperCase(),
  });

  console.log(collectionProducts);

  return (
    <>
      <Intro>
        <Suspense></Suspense>
      </Intro>
    </>
  );
}
