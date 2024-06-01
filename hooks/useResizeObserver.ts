import { useLayoutEffect, useRef, useState } from 'react';

function getRect(element: any) {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    };
  }

  return element.getBoundingClientRect();
}

export default function useResizeObserver<T extends Element>({
  onResize,
}: {
  onResize?: (rect: DOMRect) => void;
} = {}) {
  const ref = useRef<T>(null);

  const [rect, setRect] = useState(getRect(ref ? ref.current : null));

  const handleResize = () => {
    if (!ref.current) {
      return;
    }

    const rect = getRect(ref.current);
    setRect(rect);
    onResize?.(rect);
  };

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    if (typeof ResizeObserver === 'function') {
      let resizeObserver: any = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);

      return () => {
        window.removeEventListener('resize', handleResize);

        if (!resizeObserver) {
          return;
        }

        resizeObserver.disconnect();
        resizeObserver = null;
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]);

  return { ref, rect };
}
