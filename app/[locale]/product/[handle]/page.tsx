import { convertSchemaToHtml } from '@thebeyondgroup/shopify-rich-text-renderer';
import Grid from 'components/grid';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
      <Grid className="text-body min-h-full pt-[40px] laptop:pt-[134px]">
        <div className="text-heading-5 col-span-4 mt-[32px] block italic text-[#241409]  laptop:mt-0 laptop:hidden">
          <div>{product.category?.value}</div>
          <p>{product.title}</p>
        </div>
        <div className="order-2 col-span-4 laptop:order-1 laptop:col-span-3 laptop:col-start-1 laptop:flex laptop:flex-col">
          <div className="text-heading-5 mt-[30px] hidden italic text-[#241409] laptop:mb-[32px] laptop:mt-0 laptop:block">
            <div>{product.category?.value}</div>
            <p>{product.title}</p>
          </div>
          {product.availableForSale ? (
            <p className="p-[4px]">/ READY TO SHIP /</p>
          ) : (
            <p className="p-[4px]">/ OUT OF STOCK /</p>
          )}
          <div className="laptop: order-none flex laptop:order-4 laptop:justify-between">
            <p className="p-[4px]">€{product.priceRange.minVariantPrice.amount}</p>
            <a href="#" className=" p-[4px] underline">
              ADD TO CART
            </a>
          </div>

          <div>
            <h2 className="pt-[16px]">DESCRIPTION :</h2>
            <p>{product.description}</p>
          </div>
          <div className="pb-[16px] pt-[16px]">
            <p>DROP / {product.drop?.value}</p>
            <p>MODEL / {product.model?.value}</p>
            <p>CATEGORY / {product.category?.value}</p>
            <p>COLORIS / {product.color?.value}</p>
            <p>MATERIAL / {product.material?.value}</p>
            <p>DIMENSIONS / {product.size?.value}</p>
          </div>
        </div>

        <div className="order-1 col-span-4 laptop:order-2 laptop:col-span-4 laptop:col-start-5">
          <img src={product.images[0]?.url} alt={product.title} />
        </div>
        <div className="order-3 col-span-4 laptop:order-3 laptop:col-span-3 laptop:col-start-10">
          <div className="mb-2 uppercase">{product.model?.value}</div>
          <div
            className="html"
            dangerouslySetInnerHTML={{
              __html: convertSchemaToHtml(product.modelDescription?.value),
            }}
          />
        </div>
      </Grid>
    </>
  );
}
