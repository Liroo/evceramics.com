import useResizeObserver from 'hooks/useResizeObserver';
import { Image } from 'lib/shopify/types';
import { useEffect, useReducer, useRef } from 'react';

type ProductGalleryDesktopScrollProps = {
  gallery: Image[];
  scrollTop: number;
  onScrollHeightChange?: (_height: number) => void;
};

export default function ProductGalleryDesktopScroll({
  gallery,
  scrollTop,
  onScrollHeightChange,
}: ProductGalleryDesktopScrollProps) {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  // rerender 0.1s after the page is loaded to avoid the scroll bug
  const rerender = useReducer((s) => s + 1, 0);
  useEffect(() => {
    setTimeout(() => rerender[1](), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onScrollHeightChange?.(scrollRef?.current?.scrollHeight ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRef?.current?.scrollHeight]);

  return (
    <>
      <div className="h-full w-full overflow-y-scroll" ref={ref}>
        <div
          className="w-full"
          // style={{ height: (scrollRef?.current?.scrollHeight ?? 0) + 'px' }}
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
