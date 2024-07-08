'use client';

import { Link } from 'lib/navigation';
import { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

type CollectionProps = {
  product: Product;
};

export default function CollectionProduct({ product }: CollectionProps) {
  const t = useTranslations('product');

  console.log(product);

  return (
    <Link className="targeting-action mb-[10px] w-full" href={`/product/${product.handle}`}>
      <div className="aspect-[332/442] w-full bg-clay">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.featuredImage.url}
          alt="thumbnail-product"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-[15px] laptop:mt-[10px]">
        <h3 aria-label="title" className="flex gap-[14px] uppercase laptop:gap-[10px]">
          {product.title.split(' / ').map((word, index, arr) => (
            <Fragment key={index}>
              <span>{word}</span>
              {index < arr.length - 1 && <span className="text-clay-dark">/</span>}
            </Fragment>
          ))}
        </h3>
        <p
          aria-label="price"
          className={twMerge('uppercase', product.availableForSale ? '' : 'text-clay-dark')}
        >
          {product.availableForSale
            ? new Intl.NumberFormat('en-EN', {
                maximumSignificantDigits: 3,
                style: 'currency',
                currency: product.priceRange.minVariantPrice.currencyCode,
              }).format(~~product.priceRange.minVariantPrice.amount)
            : t('sold-out')}
        </p>
      </div>
    </Link>
  );
}
