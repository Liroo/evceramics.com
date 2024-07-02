import Intro from 'components/intro';
import Shop from 'components/shop';
import { getCollectionProducts, getMenu } from 'lib/shopify';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
};

export default async function ShopPage({
  params: { locale, handle },
}: {
  params: { locale: string; handle: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  unstable_setRequestLocale(locale);
  const menu = await getMenu('shop', locale.toUpperCase());
  const shopMenu = menu.map((item) => ({
    ...item,
    handle: item.path.replace('/collections/', ''),
  }));

  console.log(shopMenu, handle);

  if (!shopMenu.some((item) => item.handle === handle)) {
    return notFound();
  }

  // Get all products from the collection
  const collectionProducts = await getCollectionProducts({
    collection: handle,
    locale: locale.toUpperCase(),
  });

  return (
    <>
      <Intro>
        <Shop menu={shopMenu} products={collectionProducts} />
      </Intro>
    </>
  );
}
