'use client';

import { useCart } from '@shopify/hydrogen-react';
import type { CartLineInput } from '@shopify/hydrogen-react/storefront-api-types';
import { convertSchemaToHtml } from '@thebeyondgroup/shopify-rich-text-renderer';
import Grid from 'components/grid';
import Animation from 'components/product/gallery/animation';
import Caroussel from 'components/product/gallery/caroussel';
import { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';

type ProductProps = {
  product: Product;
};

export default function ProductView({ product }: ProductProps) {
  const t = useTranslations('product');

  const { linesAdd } = useCart();
  const merchandise: CartLineInput = { merchandiseId: product.variants[0]?.id as string };
  const addToCart = () => {
    linesAdd([merchandise]);
  };
  console.log(product.images);
  return (
    <Grid className="text-body min-h-full pt-[40px]  laptop:pt-[134px]">
      <div className="text-heading-5 col-span-4 mt-[32px] block italic text-[#241409] laptop:mt-0 laptop:hidden">
        <div>{product.category?.value}</div>
        <p>{product.title}</p>
      </div>
      <div className="order-2 col-span-4 laptop:static laptop:order-1 laptop:col-span-3 laptop:col-start-1 laptop:flex laptop:flex-col">
        <div className="text-heading-5 mt-[30px] hidden italic text-[#241409] laptop:mb-[32px] laptop:mt-0 laptop:block">
          <div>{product.category?.value}</div>
          <p>{product.title}</p>
        </div>
        {/* Laptop view */}
        <p className="hidden laptop:block laptop:p-[4px]">
          {t(product.availableForSale ? 'ready' : 'out-of-stock')}
        </p>

        <div className="hidden laptop:order-4 laptop:flex laptop:w-[180px] laptop:justify-between">
          <p className="p-[4px]">
            {new Intl.NumberFormat('en-EN', {
              maximumSignificantDigits: 3,
              style: 'currency',
              currency: product.priceRange.minVariantPrice.currencyCode,
            }).format(~~product.priceRange.minVariantPrice.amount)}
          </p>

          <button className="p-[4px] underline" onClick={addToCart}>
            {t(product.availableForSale ? 'add-cart' : 'out-cart')}
          </button>
        </div>

        {/* Mobile view */}
        <div className=" flex justify-between laptop:hidden">
          <p className="p-[4px]">{t(product.availableForSale ? 'ready' : 'out-of-stock')}</p>
          <div className="flex">
            <p className="p-[4px]">
              {new Intl.NumberFormat('en-EN', {
                maximumSignificantDigits: 3,
                style: 'currency',
                currency: product.priceRange.minVariantPrice.currencyCode,
              }).format(~~product.priceRange.minVariantPrice.amount)}
            </p>
            <button className="p-[4px] underline" onClick={addToCart}>
              {t(product.availableForSale ? 'add-cart' : 'out-cart')}
            </button>
          </div>
        </div>
        <div>
          <h2 className="pb-[5px] pt-[16px]">DESCRIPTION :</h2>
          <p className="">{product.description}</p>
        </div>
        <div className="pb-[16px] pt-[16px] laptop:pb-[16px]">
          <p className="pb-[8px] laptop:pb-[2px]">
            {t('drop')} / {product.drop?.value}
          </p>
          <p className="pb-[8px] laptop:pb-[2px]">
            {t('model')} / {product.model?.value}
          </p>
          <p className="pb-[8px] laptop:pb-[2px]">
            {t('product-category')} / {product.category?.value}
          </p>
          <p className="pb-[8px] laptop:pb-[2px]">
            {t('color')} / {product.color?.value}
          </p>
          <p className="pb-[8px] laptop:pb-[2px]">
            {t('material')} / {product.material?.value}
          </p>
          <p className="pb-[8px] laptop:pb-[2px]">
            {t('dimensions')} / {product.size?.value}
          </p>
        </div>
      </div>

      <div className="order-1 col-span-4 laptop:order-2 laptop:col-span-4 laptop:col-start-5">
        {/* <img src={product.images[0]?.url} alt={product.title} /> */}
        <Caroussel imageInfo={product} />
        <Animation imageInfo={product} />
      </div>

      <div className="order-3 col-span-4 laptop:order-3 laptop:col-span-3 laptop:col-start-10">
        <div className="mb-[5px] uppercase">{product.model?.value}</div>
        <div
          className="html"
          dangerouslySetInnerHTML={{
            __html: convertSchemaToHtml(product.modelDescription?.value),
          }}
        />
      </div>
    </Grid>
  );
}
