import Home from 'components/home';
import Intro from 'components/intro';
import { getCollectionProducts } from 'lib/shopify';
import { unstable_setRequestLocale } from 'next-intl/server';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
};

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  unstable_setRequestLocale(locale);

  // Get all products from the collection
  const collectionProducts = await getCollectionProducts({
    collection: 'last-drop',
    locale: locale.toUpperCase(),
  });

  return (
    <>
      <Intro>
        <Home products={collectionProducts} />
      </Intro>
    </>
  );
}
