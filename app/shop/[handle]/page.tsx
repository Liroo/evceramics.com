import Intro from 'components/intro';
import Shop from 'components/shop';
import { getCollectionProducts, getMenu } from 'lib/shopify';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Shop',
  description:
    'EV Ceramics is a ceramic studio run by Emilie Vizcano. All the pieces she makes are handmade, one by one, using the modelling technique.',
  openGraph: {
    type: 'website',
  },
};

export default async function ShopPage({ params: { handle } }: { params: { handle: string } }) {
  const locale = await getLocale();

  const menu = await getMenu('shop', locale.toUpperCase());
  const shopMenu = menu.map((item) => ({
    ...item,
    handle: item.path.replace('/collections/', ''),
  }));

  if (shopMenu.length === 0) return notFound();

  if (!shopMenu.some((item) => item.handle === handle)) return notFound();

  // Get all products from the collection
  const collectionProducts = await getCollectionProducts({
    collection: handle as string,
    locale: locale.toUpperCase(),
  });

  return (
    <>
      <Intro>
        <Shop collectionHandle={handle as string} menu={shopMenu} products={collectionProducts} />
      </Intro>
    </>
  );
}
