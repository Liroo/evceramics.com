import useResizeObserver from 'hooks/useResizeObserver';
import { Image } from 'lib/shopify/types';
import { UIEvent, useEffect, useRef } from 'react';

type ProductGalleryDesktopScrollProps = {
  gallery: Image[];
};

export default function ProductGalleryDesktopScroll({ gallery }: ProductGalleryDesktopScrollProps) {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);

  // navbar visibility for animation
  const onScroll = (evt: UIEvent<HTMLDivElement>) => {
    if (!scrollRef.current || !ref.current) return;

    scrollRef.current.scrollTop = (evt.target as HTMLDivElement).scrollTop;

    const isScroll = (evt.target as HTMLDivElement).scrollTop > 74;

    window.dispatchEvent(new CustomEvent('navbar-visibility', { detail: isScroll }));
  };
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('navbar-visibility', { detail: false }));
    };
  }, [scrollRef, ref]);

  return (
    <>
      <div className="h-full w-full overflow-y-scroll" ref={ref} onScroll={onScroll}>
        <div
          className="w-full"
          style={{ height: (scrollRef?.current?.scrollHeight ?? 0) + 'px' }}
        />
      </div>
      <div
        ref={scrollRef}
        className="pointer-events-none fixed bottom-0 top-0 z-[5000] flex flex-col gap-[20px] overflow-y-scroll pb-[20px] pt-[134px]"
        style={{
          left: rect.left + 'px',
          width: rect.width + 'px',
        }}
      >
        {gallery.map((image, i) => {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={image.url} alt="gallery image" />
          );
        })}
      </div>
    </>
  );
}
