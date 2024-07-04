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
  params: { locale },
  searchParams: { drop },
}: {
  params: { locale: string; handle: string };
  searchParams: { drop: string };
}) {
  unstable_setRequestLocale(locale);
  const menu = await getMenu('shop', locale.toUpperCase());
  const shopMenu = menu.map((item) => ({
    ...item,
    handle: item.path.replace('/collections/', ''),
  }));

  if (shopMenu.length === 0) return notFound();

  let collectionHandle = shopMenu[0]?.handle;
  if (shopMenu.some((item) => item.handle === drop)) collectionHandle = drop;

  // Get all products from the collection
  const collectionProducts = await getCollectionProducts({
    collection: collectionHandle as string,
    locale: locale.toUpperCase(),
  });

  return (
    <>
      <Intro>
        <Shop
          collectionHandle={collectionHandle as string}
          menu={shopMenu}
          products={collectionProducts}
        />
      </Intro>
    </>
  );
}
