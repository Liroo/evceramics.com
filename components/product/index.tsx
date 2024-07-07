'use client';

import { RichText, useCart } from '@shopify/hydrogen-react';
import Grid from 'components/grid';
import ProductGalleryCaroussel from 'components/product/gallery/caroussel';
import ProductGalleryDesktopScroll from 'components/product/gallery/desktopScroll';
import { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

type ProductProps = {
  product: Product;
};

export default function ProductView({ product }: ProductProps) {
  const t = useTranslations('product');

  // Cart
  const { linesAdd, lines } = useCart();

  const addToCart = () => {
    linesAdd([{ merchandiseId: product.variants[0]?.id as string }]);
  };

  const variantInCart = lines?.find((line) => line?.merchandise?.product?.id === product.id);
  const addToCartDisabled =
    !product.availableForSale ||
    (variantInCart && (variantInCart.quantity as number) >= product.totalInventory);

  return (
    <Grid className="text-body min-h-full pt-[40px] laptop:h-full laptop:pt-[134px]">
      {/* mobile top */}
      <div className="text-heading-5 col-span-4 mt-[32px] block italic text-mud laptop:mt-0 laptop:hidden">
        <p>{product.category?.value}</p>
        <p>{product.title}</p>
      </div>
      {/* First cell desktop */}
      <div className="order-2 col-span-4 h-auto laptop:order-1 laptop:col-span-3 laptop:col-start-1 laptop:flex laptop:flex-col">
        <div className="text-heading-5 mt-[30px] hidden italic text-mud laptop:mb-[32px] laptop:mt-0 laptop:block">
          <p>{product.category?.value}</p>
          <p>{product.title}</p>
        </div>
        {/* Laptop view */}
        <p className="hidden laptop:block  laptop:p-[4px]">
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

          <button
            className={twMerge('p-[4px] underline', addToCartDisabled ? 'text-clay-dark' : '')}
            onClick={addToCart}
          >
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
            <button
              className={twMerge('p-[4px] underline', addToCartDisabled ? 'text-clay-dark' : '')}
              onClick={addToCart}
            >
              {t(product.availableForSale ? 'add-cart' : 'out-cart')}
            </button>
          </div>
        </div>
        <div>
          <h2 className="pb-[5px] pt-[16px]">DESCRIPTION :</h2>
          {product.description && <p>{product.description}</p>}
        </div>
        <div className="flex flex-col gap-[8px] pb-[16px] pt-[16px] laptop:gap-[2px] laptop:pb-[16px]">
          {product.drop && (
            <p>
              {t('drop')} / {product.drop?.value}
            </p>
          )}
          {product.model && (
            <p>
              {t('model')} / {product.model?.value}
            </p>
          )}
          {product.category && (
            <p>
              {t('product-category')} / {product.category?.value}
            </p>
          )}
          {product.color && (
            <p>
              {t('color')} / {product.color?.value}
            </p>
          )}
          {product.material && (
            <p>
              {t('material')} / {product.material?.value}
            </p>
          )}
          {product.size && (
            <p>
              {t('dimensions')} / {product.size?.value}
            </p>
          )}
        </div>
      </div>

      <div className="order-1 col-span-4 overflow-y-scroll laptop:col-span-4 laptop:col-start-5 laptop:h-full">
        <div className="contents laptop:hidden">
          <ProductGalleryCaroussel gallery={product.images} />
        </div>
        <div className="hidden laptop:contents">
          <ProductGalleryDesktopScroll gallery={product.images} />
        </div>
      </div>

      <div className="order-3 col-span-4 pb-[20px] laptop:col-span-3 laptop:col-start-10">
        <div className="mb-[5px] uppercase">{product.model?.value}</div>
        {product.modelDescription ? (
          <RichText data={product.modelDescription?.value as string} />
        ) : null}
      </div>
    </Grid>
  );
}
