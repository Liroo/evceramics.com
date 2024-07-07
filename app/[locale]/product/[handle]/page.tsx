import Product from 'components/product/index';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
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

export default async function ProductPage({
  params: { handle, locale },
}: {
  params: { handle: string; locale: string };
}) {
  unstable_setRequestLocale(locale);

  const product = await getProduct(handle, locale.toUpperCase());
  if (!product) return notFound();

  return (
    <>
      <Product product={product} />
    </>
  );
}
