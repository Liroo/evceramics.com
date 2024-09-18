import Product from 'components/product/index';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
export async function generateMetadata({
  params,
}: {
  params: { handle: string; locale: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle, params.locale?.toUpperCase?.());

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage({ params: { handle } }: { params: { handle: string } }) {
  const locale = await getLocale();

  const product = await getProduct(handle, locale.toUpperCase());
  if (!product) return notFound();

  const productRecommendations = await getProductRecommendations(
    product.id,
    locale?.toUpperCase?.(),
  );

  // remove products that have as collection disabled_evceramics
  const filteredProductRecommendations = productRecommendations.filter(
    (product) =>
      !product.collections.edges.some((edge) => edge.node.handle === 'disabled_evceramics'),
  );

  return (
    <>
      <Product product={product} productRecommendations={filteredProductRecommendations} />
    </>
  );
}
