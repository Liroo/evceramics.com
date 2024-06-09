'use client';

import { useEffect, useState } from 'react';

export default function GridPreview() {
  const [showGrid, setShowGrid] = useState<boolean>(false);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'g') {
        setShowGrid((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, []);

  if (!showGrid) return null;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-full justify-center">
      <div className="hidden h-full w-full grid-cols-12 items-center gap-[16px] px-[32px] laptop:grid">
        {Array.from({ length: 12 })
          .fill(null)
          .map((_, index) => (
            <div key={index} className="col-span-1 h-full bg-[#ff0000] bg-opacity-20" />
          ))}
      </div>
      <div className="grid h-full w-full grid-cols-4 items-center gap-[10px] px-[10px] laptop:hidden">
        {Array.from({ length: 4 })
          .fill(null)
          .map((_, index) => (
            <div key={index} className="col-span-1 h-full bg-[#ff0000] bg-opacity-20" />
          ))}
      </div>
    </div>
  );
}
