import PageTransition from 'components/animation/pageTransition';
import ProductComponent from 'components/product/index';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { GetServerSidePropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { ForwardedRef, forwardRef } from 'react';

function Page(
  {
    product,
    productRecommendations,
  }: {
    product: Product;
    productRecommendations: Product[];
  },
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return (
    <>
      <NextSeo
        title={product.seo.title || product.title}
        description={product.seo.description || product.description}
        openGraph={{
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }}
        noindex={!indexable}
        nofollow={!indexable}
      />
      <PageTransition ref={ref}>
        <ProductComponent product={product} productRecommendations={productRecommendations} />
      </PageTransition>
    </>
  );
}

export const getServerSideProps = async ({ locale, query }: GetServerSidePropsContext) => {
  const { handle } = query as { handle: string };

  const product = await getProduct(handle, (locale as string).toUpperCase());

  if (!product)
    return {
      notFound: true,
    };

  const productRecommendations = await getProductRecommendations(
    product.id,
    locale?.toUpperCase?.(),
  );

  // remove products that have as collection disabled_evceramics
  const filteredProductRecommendations = productRecommendations.filter(
    (product) =>
      !product.collections.edges.some((edge) => edge.node.handle === 'disabled_evceramics'),
  );

  return {
    props: {
      product,
      productRecommendations: filteredProductRecommendations.splice(0, 3),
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
};

export default forwardRef(Page);
