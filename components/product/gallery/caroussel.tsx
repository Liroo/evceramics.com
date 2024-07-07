import ArrowRightSvg from 'icons/arrow-right.svg';
import { Image } from 'lib/shopify/types';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ProductGalleryCarousselProps = {
  gallery: Image[];
};

function Arrow({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        'flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white',
        className,
      )}
    >
      <ArrowRightSvg className="fill-currant w-[13px] text-black" />
    </div>
  );
}

export default function ProductGalleryCaroussel({ gallery }: ProductGalleryCarousselProps) {
  // handle image index
  const [index, setIndex] = useState<number>(0);
  const onNext = () => setIndex((index + 1) % gallery.length);
  const onPrev = () => setIndex((index + gallery.length - 1) % gallery.length);

  return (
    <div className=" relative flex aspect-[410/547] w-full items-center justify-center laptop:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="h-full w-full object-cover" src={gallery[index]?.url} alt="Caroussel image" />
      <div className="absolute flex h-full w-full items-center">
        <div className="flex-1 px-[14px]" onClick={onPrev}>
          <Arrow className="rotate-180" />
        </div>
        <div className="flex-1 px-[14px]" onClick={onNext}>
          <Arrow className="ml-auto" />
        </div>
      </div>
    </div>
  );
}
