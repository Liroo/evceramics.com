import { useCart } from '@shopify/hydrogen-react';
import { CartLine } from '@shopify/hydrogen-react/storefront-api-types';
import GridCart from 'components/grid/cart';
import CrossSvg from 'icons/cross.svg';
import { Link } from 'lib/navigation';
import { getProduct } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

function Line({ line }: { line: CartLine }) {
  const locale = useLocale();
  const cart = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(line.merchandise.product.handle, locale.toUpperCase());

      if (product) setProduct(product);
    };

    fetchProduct();
  }, [locale, line.merchandise.product.handle]);

  const merchandise = line.merchandise;

  const onClickRemoveLine = () => {
    cart.linesRemove([line.id]);
  };
  const onClickUpdateQuantity = (quantity: number) => {
    cart.linesUpdate([{ id: line.id, quantity }]);
  };

  return (
    <GridCart className="text-body">
      <Link
        href={`/product/${merchandise.product.handle}`}
        className="targeting-action col-span-1 aspect-[95/127] bg-clay"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={merchandise?.image?.url || ''}
          alt={merchandise?.image?.altText || ''}
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="col-span-3 flex flex-col items-stretch justify-between laptop:col-span-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="uppercase">{merchandise.product.title.split('/').join('-')}</p>
            {product?.color && <p className="capitalize">{product?.color.value}</p>}
          </div>
          <div className="targeting-action m-[-10px] p-[10px]" onClick={onClickRemoveLine}>
            <CrossSvg className="w-[9px] fill-current text-mud" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex gap-[20px]">
            <button
              className="targeting-action m-[-10px] p-[10px] outline-none"
              onClick={() => {
                line.quantity > 1 ? onClickUpdateQuantity(line.quantity - 1) : onClickRemoveLine();
              }}
            >
              <p>-</p>
            </button>
            <div>
              <p>{line.quantity}</p>
            </div>
            <button
              disabled={!product || line.quantity >= product?.totalInventory}
              className={twMerge(
                'outline-none',
                !product || line.quantity >= product?.totalInventory
                  ? 'text-clay-dark'
                  : 'targeting-action',
              )}
              onClick={() => onClickUpdateQuantity(line.quantity + 1)}
            >
              <p>+</p>
            </button>
          </div>
          <p>
            {new Intl.NumberFormat('en-EN', {
              maximumSignificantDigits: 3,
              style: 'currency',
              currency: merchandise.price.currencyCode ?? 'EUR',
            }).format(~~(merchandise.price.amount ?? 0))}
          </p>
        </div>
      </div>
    </GridCart>
  );
}

export default function CartLines() {
  const cart = useCart();
  const t = useTranslations('cart');

  if (!cart?.lines?.length)
    return (
      <GridCart className="text-body laptop:pt-[80px]">
        <p className="col-span-3">{t('empty')}</p>
      </GridCart>
    );

  return (
    <div className="flex flex-col gap-[16px] pb-[16px] pt-[16px] laptop:pb-[24px] laptop:pt-[80px]">
      {cart.lines.map((line, index) => (
        <Line key={index} line={line as CartLine} />
      ))}
    </div>
  );
}
