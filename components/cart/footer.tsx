import { useCart } from '@shopify/hydrogen-react';
import ArrowRightSvg from 'icons/arrow-right.svg';
import RadioSelectedSvg from 'icons/radio-selected.svg';
import RadioSvg from 'icons/radio.svg';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function CartFooter() {
  const { checkoutUrl, cost, totalQuantity = 0 } = useCart();
  const t = useTranslations('cart');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  return (
    <div className="text-menu mt-auto flex flex-col px-[var(--grid-col-px)]">
      <div className="mb-[50px] mt-[20px] text-[14px] font-medium leading-[16px] laptop:mb-[40px] laptop:text-[11px] laptop:leading-[12px]">
        <p>{t('shipping-fees')}</p>
        <p>{t('taxes-duty')}</p>

        <div
          className="targeting-action mt-[13px] flex select-none laptop:mt-[10px]"
          onClick={() => setTermsAccepted(!termsAccepted)}
        >
          {termsAccepted ? (
            <RadioSelectedSvg className="w-[10px]" />
          ) : (
            <RadioSvg className="w-[10px]" />
          )}
          <p className="ml-[10px]">{t('accept-terms')}</p>
        </div>
      </div>
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
          'flex h-[52px] w-full items-center justify-between border border-mud bg-white px-[10px] outline-none laptop:h-[40px] laptop:px-[8px]',
          checkoutUrl && termsAccepted && totalQuantity > 0
            ? 'targeting-action group hover:bg-mud hover:text-[#F4F4F4]'
            : 'opacity-60',
        )}
        disabled={!checkoutUrl || !termsAccepted || totalQuantity <= 0}
        onClick={() => window.open(checkoutUrl, '_self')}
      >
        <p className="text-[24px] font-light leading-[31px] laptop:text-[18px] laptop:leading-[24px]">
          {t('checkout')}
        </p>

        <ArrowRightSvg className="w-[19px] shrink-0 fill-current text-mud group-hover:text-[#f4f4f4] laptop:w-[15px]" />
      </button>
    </div>
  );
}
