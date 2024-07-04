import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

type CartProps = {
  open: boolean;
  onCloseCart: () => void;
};

export default function Cart({ open = false, onCloseCart }: CartProps) {
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close cart when clicking outside
    const handleClick = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        onCloseCart();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onCloseCart]);

  return (
    <div
      ref={cartRef}
      className={twMerge(
        'fixed right-0 top-0 z-[3000] h-dvh w-screen overflow-hidden transition-all duration-300 tablet:w-[396px]',
        open ? '' : 'w-0 tablet:w-0',
      )}
    >
      <div className="h-dvh w-screen bg-white tablet:w-[396px]"></div>
    </div>
  );
}
