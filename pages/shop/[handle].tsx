import PageTransition from 'components/animation/pageTransition';
import Intro from 'components/intro';
import Shop from 'components/shop';
import { getCollectionProducts, getMenu } from 'lib/shopify';
import { Menu, Product } from 'lib/shopify/types';
import { GetServerSidePropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { ForwardedRef, forwardRef } from 'react';

function Page(
  {
    handle,
    products,
    shopMenu,
  }: {
    handle: string;
    products: Product[];
    shopMenu: any & Menu[];
  },
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <>
      <NextSeo title="Shop | EV Ceramics" />
      <PageTransition ref={ref}>
        <Intro>
          <Shop collectionHandle={handle as string} menu={shopMenu} products={products} />
        </Intro>
      </PageTransition>
    </>
  );
}

export const getServerSideProps = async ({ locale, query }: GetServerSidePropsContext) => {
  const { handle } = query as { handle: string };

  const promises = [
    getCollectionProducts({
      collection: handle,
      locale: (locale as string).toUpperCase(),
    }),
    getMenu('shop', (locale as string).toUpperCase()),
  ];

  const [products, shopMenu] = await Promise.all(promises);

  const serializedShopMenu = (shopMenu as Menu[]).map((item) => ({
    ...item,
    handle: item.path.replace('/collections/', ''),
  }));

  if (
    !serializedShopMenu ||
    serializedShopMenu.length === 0 ||
    !serializedShopMenu.some((item) => item.handle === handle)
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products,
      shopMenu: serializedShopMenu,
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
};

export default forwardRef(Page);
