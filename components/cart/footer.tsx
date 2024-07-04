import { useCart } from '@shopify/hydrogen-react';
import ArrowRightSvg from 'icons/arrow-right.svg';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

export default function CartFooter() {
  const { checkoutUrl, cost } = useCart();
  const t = useTranslations('cart');

  return (
    <div className="text-menu mt-auto flex flex-col px-[var(--grid-col-px)]">
      <div className="mb-[20px] flex justify-between">
        <p className="uppercase">{t('subtotal')}</p>
        <p>
          {new Intl.NumberFormat('en-EN', {
            maximumSignificantDigits: 3,
            style: 'currency',
            currency: cost?.totalAmount?.currencyCode ?? 'EUR',
          }).format(~~(cost?.totalAmount?.amount ?? 0))}
        </p>
      </div>
      <button
        className={twMerge(
          'flex h-[52px] w-full items-center justify-between border border-black bg-white px-[10px] outline-none laptop:h-[40px] laptop:px-[8px]',
          checkoutUrl ? 'group hover:bg-black hover:text-[#F4F4F4]' : 'cursor-not-allowed',
        )}
        disabled={!checkoutUrl}
        onClick={() => window.open(checkoutUrl)}
      >
        <p className="text-[24px] font-light leading-[31px] laptop:text-[18px] laptop:leading-[24px]">
          {t('checkout')}
        </p>

        <ArrowRightSvg className="w-[19px] shrink-0 fill-current text-mud group-hover:text-[#f4f4f4] laptop:w-[15px]" />
      </button>
    </div>
  );
}
