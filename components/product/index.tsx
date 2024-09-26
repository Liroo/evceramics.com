'use client';

import { RichText, useCart } from '@shopify/hydrogen-react';
import Grid from 'components/grid';
import ProductGalleryCaroussel from 'components/product/gallery/caroussel';
import ProductGalleryDesktopScroll from 'components/product/gallery/desktopScroll';
import { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { UIEvent, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ProductRecommendations from './recommendations';

type ProductProps = {
  product: Product;
  productRecommendations: Product[];
};

export default function ProductView({ product, productRecommendations }: ProductProps) {
  const t = useTranslations('product');

  // Cart
  const { linesAdd, lines } = useCart();

  const addToCart = () => {
    linesAdd([
      {
        merchandiseId: product.variants[0]?.id as string,
        attributes: [product.category, product.model, product.color, product.material, product.size]
          .filter((attr) => attr && attr.value && attr.key)
          .map((attr) => ({ key: attr?.key as string, value: attr?.value as string })),
      },
    ]);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open:cart', { detail: false }));
    }, 200);
  };

  const variantInCart = lines?.find((line) => line?.merchandise?.product?.id === product.id);
  const addToCartDisabled =
    !product.availableForSale ||
    (variantInCart && (variantInCart.quantity as number) >= product.totalInventory);

  // scroll
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const onScrollHeightChange = (height: number) => {
    setScrollHeight(height);
  };
  // navbar visibility for animation
  const onScroll = (evt: UIEvent<HTMLDivElement>) => {
    setScrollTop((evt.target as HTMLDivElement).scrollTop);

    const isScroll = (evt.target as HTMLDivElement).scrollTop > 74;

    window.dispatchEvent(new CustomEvent('navbar-visibility', { detail: isScroll }));
  };
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('navbar-visibility', { detail: false }));
    };
  }, []);

  return (
    <div
      className="contents laptop:block laptop:h-full laptop:overflow-y-scroll"
      onScroll={onScroll}
    >
      <Grid
        className="text-body min-h-full items-start pt-[40px] laptop:h-full laptop:pt-[134px]"
        style={{
          height: scrollHeight === 0 ? undefined : `${scrollHeight}px`,
        }}
      >
        {/* mobile top */}
        <div className="text-heading-5 col-span-4 mt-[32px] block italic text-mud laptop:mt-0 laptop:hidden">
          <p>{product.category?.value}</p>
          <p>{product.title}</p>
        </div>

        {/* First cell desktop */}
        <div className="order-2 col-span-4 h-auto laptop:sticky laptop:top-[134px] laptop:order-1 laptop:col-span-3 laptop:col-start-1 laptop:flex laptop:flex-col">
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

            {product.availableForSale && (
              <button
                className={twMerge(
                  'p-[4px] underline',
                  addToCartDisabled ? 'text-clay-dark' : 'targeting-action',
                )}
                onClick={addToCart}
                disabled={addToCartDisabled}
              >
                {t(product.availableForSale ? 'add-cart' : 'out-cart')}
              </button>
            )}
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
              {product.availableForSale && (
                <button
                  className={twMerge(
                    'p-[4px] underline',
                    addToCartDisabled ? 'text-clay-dark' : 'targeting-action',
                  )}
                  onClick={addToCart}
                  disabled={addToCartDisabled}
                >
                  {t(product.availableForSale ? 'add-cart' : 'out-cart')}
                </button>
              )}
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
            <ProductGalleryDesktopScroll
              gallery={product.images}
              scrollTop={scrollTop}
              onScrollHeightChange={onScrollHeightChange}
            />
          </div>
        </div>

        <div className="order-3 col-span-4 flex flex-col pb-[20px] laptop:sticky laptop:top-[134px] laptop:col-span-3 laptop:col-start-10 laptop:min-h-[calc(100dvh-134px)]">
          <div>
            <div className="mb-[5px] uppercase">{product.model?.value}</div>
            {product.modelDescription ? (
              <RichText
                data={product.modelDescription?.value as string}
                components={{
                  paragraph({ node }) {
                    return <p className="mb-[6px]">{node.children}</p>;
                  },
                }}
              />
            ) : null}
          </div>
          <div className="mt-auto hidden laptop:mb-[60px] laptop:block">
            <ProductRecommendations productRecommendations={productRecommendations} />
          </div>
        </div>
      </Grid>
      <div className="mt-auto laptop:hidden">
        <ProductRecommendations productRecommendations={productRecommendations} />
      </div>
    </div>
  );
}
