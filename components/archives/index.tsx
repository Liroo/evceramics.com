'use client';

import AnimationOpacityIn from 'components/animation/opacityIn';
import ArrowRightSvg from 'icons/arrow-right.svg';
import { Image } from 'lib/shopify/types';
import { WheelEvent, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { twMerge } from 'tailwind-merge';

type ArchivesProps = {
  gallery: Image[];
};

export default function Archives({ gallery }: ArchivesProps) {
  const galleryScrollElement = useRef<HTMLDivElement>(null);

  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!event.deltaY) return;
    if (galleryScrollElement.current) {
      galleryScrollElement.current.scrollLeft += event.deltaY + event.deltaX;
    }
  };

  return (
    <div className="relative flex h-full flex-col items-center">
      <div className="flex w-full flex-1 items-end justify-center overflow-hidden px-[var(--grid-col-px)] pt-[40px] laptop:pt-[74px]">
        {hoveredImageIndex !== null ? (
          <div
            className={twMerge(
              'pointer-events-none flex h-full w-full items-end justify-center overflow-hidden pb-[80px] laptop:pb-[80px] laptop:pt-[80px]',
            )}
          >
            <div className="aspect-[332/442] w-full laptop:h-full laptop:w-auto">
              {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
              <img
                src={gallery[hoveredImageIndex]?.url}
                className="h-full w-full object-cover object-bottom"
              />
            </div>
          </div>
        ) : null}
      </div>
      {gallery.length > 4 ? (
        <ArrowRightSvg className="absolute bottom-[calc((100vw-50px)/4*(133/100))] right-[10px] mb-[16px] w-[15px] shrink-0 fill-current text-mud laptop:hidden" />
      ) : null}
      <div
        ref={galleryScrollElement}
        className="mt-auto flex w-full gap-[10px] overflow-x-scroll p-[var(--grid-col-px)] laptop:gap-[5px]"
        onWheel={onWheel}
      >
        {gallery.map((image, index) => (
          <div
            className="aspect-[100/133] w-[calc((100vw-2*var(--grid-col-px)-((var(--grid-col-nb)-1)*var(--grid-col-gap)))/var(--grid-col-nb))] min-w-[calc((100vw-2*var(--grid-col-px)-((var(--grid-col-nb)-1)*var(--grid-col-gap)))/var(--grid-col-nb))]"
            key={index}
            onClick={() => setHoveredImageIndex(index % gallery.length)}
            onMouseEnter={() => setHoveredImageIndex(index % gallery.length)}
            onMouseLeave={() => {
              if (!isMobile) setHoveredImageIndex(null);
            }}
          >
            <AnimationOpacityIn delay={index * 0.1}>
              {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
              <img src={image.url} className="h-full w-full object-cover" />
            </AnimationOpacityIn>
          </div>
        ))}
      </div>
    </div>
  );
}
