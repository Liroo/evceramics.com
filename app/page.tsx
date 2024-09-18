import Home from 'components/home';
import Intro from 'components/intro';
import { getCollectionProducts } from 'lib/shopify';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

export const metadata = {
  description:
    'EV Ceramics is a ceramic studio run by Emilie Vizcano. All the pieces she makes are handmade, one by one, using the modelling technique.',
};

export default async function HomePage({}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const locale = await getLocale();
  // Get all products from the collection
  const collectionProducts = await getCollectionProducts({
    collection: 'last-drop',
    locale: locale.toUpperCase(),
  });

  return (
    <>
      <Intro>
        <Suspense>
          <Home products={collectionProducts} />
        </Suspense>
      </Intro>
    </>
  );
}
