import { useCart } from '@shopify/hydrogen-react';
import GridCart from 'components/grid/cart';
import { useTranslations } from 'next-intl';

type CartHeaderProps = {
  onCloseCart: () => void;
};

export default function CartHeader({ onCloseCart }: CartHeaderProps) {
  const cart = useCart();
  const tMenu = useTranslations('menu');
  const tCart = useTranslations('cart');

  return (
    <GridCart className="text-menu hidden uppercase laptop:grid">
      <div className="col-span-1 cursor-pointer select-none" onClick={onCloseCart}>
        <p>{tCart('close')}</p>
      </div>
      <div
        className="col-span-1 col-start-3 flex cursor-pointer select-none flex-col gap-[2px] justify-self-end"
        onClick={onCloseCart}
      >
        <p>{tMenu('cart')}</p>
        <p>({cart.totalQuantity ?? 0})</p>
      </div>
    </GridCart>
  );
}
