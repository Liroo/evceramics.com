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

  console.log(product);

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

        <div className="w-90 h-80">
          <img src={product.images[0]?.url} alt={product.title} className="w-90 object-cover" />
        </div>

        <div className="">
          <div>
            {product.availableForSale ? '/ READY TO SHIP /' : '/ OUT OF STOCK /'}
            <p>€{product.priceRange.minVariantPrice.amount}</p>
            <a href="#">Add to cart</a>
          </div>
          <div className="">
            <h2>DESCRIPTION :</h2>
            <p>{product.description}</p>
          </div>
          <div className="">
            <p>DROP / {}</p>
            <p>MODEL / {}</p>
            <p>CATEGORY / {}</p>
            <p>COLOR / {}</p>
            <p>MATERIAL / {}</p>
            <p>DIMENSIONS / {}</p>
          </div>
        </div>
      </div>
    </>
  );
}
