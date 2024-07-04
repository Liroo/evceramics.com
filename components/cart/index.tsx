import { useRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { twMerge } from 'tailwind-merge';
import CartFooter from './footer';
import CartHeader from './header';

type CartProps = {
  open: boolean;
  onCloseCart: () => void;
};

export default function Cart({ open = false, onCloseCart }: CartProps) {
  const cartRef = useRef<HTMLDivElement>(null);

  return (
    <RemoveScroll enabled={open}>
      <div
        onClick={onCloseCart}
        className={twMerge(
          'fixed left-0 top-0 z-[2000] hidden h-dvh w-screen cursor-pointer bg-black bg-opacity-10 transition-all duration-300 laptop:block',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        ref={cartRef}
        className={twMerge(
          'fixed bottom-0 right-0 z-[3000] h-[calc(100dvh-40px)] w-screen overflow-hidden transition-all duration-300 laptop:h-dvh laptop:w-[396px]',
          open ? '' : 'w-0 laptop:w-0',
        )}
      >
        <div className="flex h-[calc(100dvh-40px)] w-screen flex-col overflow-y-scroll bg-white pb-[16px] pt-[16px] laptop:h-dvh laptop:w-[396px] laptop:pb-[24px] laptop:pt-[24px]">
          <CartHeader onCloseCart={onCloseCart} />
          <CartFooter />
        </div>
      </div>
    </RemoveScroll>
  );
}
