import { useCart } from '@shopify/hydrogen-react';
import GridCart from 'components/grid/cart';
import { useTranslations } from 'next-intl';

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
    <div className="flex flex-col gap-[16px] pb-[16px] pt-[16px] laptop:pb-[24px] laptop:pt-[24px]">
      {cart.lines.map((line, index) => (
        <div key={index} className="flex items-center gap-[16px]">
          <div className="h-[64px] w-[64px] bg-gray-200" />
          <div className="flex flex-col gap-[4px]">
            <p>{line?.merchandise?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
