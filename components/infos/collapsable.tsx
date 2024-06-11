'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function InfosCollapsable({
  className,
  localeKey,
  items,
}: {
  className?: string;
  localeKey: string;
  items: string[];
}) {
  const t = useTranslations('infos');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={twMerge('', className)}>
      <p
        className={twMerge('cursor-pointer select-none uppercase', open ? '' : 'text-clay-dark')}
        onClick={() => setOpen((prev) => !prev)}
      >
        {t(`${localeKey}.title`)}
      </p>
      <div
        className={twMerge(
          'grid transition-all',
          open ? 'grid grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          {items.map((item, index) => (
            <div key={index} className="mt-[10px] flex first:mt-[20px] last:mb-[20px]">
              <div className="flex w-[27px] shrink-0 justify-between">
                <p>{(index + 1).toString().padStart(2, '0')}</p>
                <p className="text-clay-dark">/</p>
              </div>
              <p className="ml-[10px]">{t(`${localeKey}.${item}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
