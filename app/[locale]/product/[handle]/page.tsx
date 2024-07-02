import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

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

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  console.log(product.collections.edges[0]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="grid laptop:h-40 laptop:w-20">
        <div className="w-100 h-auto">
          <p>{product.title}</p>
        </div>

        <div className="h-90 m-2.5 w-[95%]">
          <img src={product.images[0]?.url} alt={product.title} className="object-cover" />
        </div>

        <div className="ml-2.5 mr-2.5 text-[14px] laptop:text-[12px]">
          <div className="mb-2.5 flex justify-between p-1">
            {product.availableForSale ? (
              <div className="p-1">/ READY TO SHIP /</div>
            ) : (
              <div className="p-1">/ OUT OF STOCK /</div>
            )}
            <div className="flex ">
              <p className="p-1">€{product.priceRange.minVariantPrice.amount}</p>
              <a href="#" className="p-1">
                Add to cart
              </a>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="mb-1.5">DESCRIPTION :</h2>
            <p>{product.description}</p>
          </div>
          <div className="">
            <p>DROP / {product.drop?.value}</p>
            <p>MODEL / {}</p>
            <p>CATEGORY / {}</p>
            <p>COLORIS / {product.color?.value}</p>
            <p>MATERIAL / {product.material?.value}</p>
            <p>DIMENSIONS / {product.size?.value}</p>
          </div>
        </div>
        <div className="m-2.5">
          {<div className="">{product.collections.edges[0].node.title}</div>}
          <div className="">{product.collections.edges[0].node.description}</div>
        </div>
      </div>
    </>
  );
}
