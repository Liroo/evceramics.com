import PageTransition from 'components/animation/pageTransition';
import Home from 'components/home';
import Intro from 'components/intro';
import { getCollectionProducts } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { GetServerSidePropsContext } from 'next';
import { ForwardedRef, Suspense, forwardRef } from 'react';

function Page({ products }: { products: Product[] }, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <PageTransition ref={ref}>
      <Intro>
        <Suspense>
          <Home products={products} />
        </Suspense>
      </Intro>
    </PageTransition>
  );
}

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const promises = [
    getCollectionProducts({
      collection: 'last-drop',
      locale: (locale as string).toUpperCase(),
    }),
  ];

  const [products] = await Promise.all(promises);

  return {
    props: {
      products,
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
};

export default forwardRef(Page);
