'use client';

import Grid from 'components/grid';
import ArrowRightSvg from 'icons/arrow-right.svg';
import { usePathname, useRouter } from 'lib/navigation';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type CollectionBreadcrumbProps = {
  prefix: string;
  name: string;
  onClick?: () => void;
};

export default function CollectionBreadcrumb({ prefix, name, onClick }: CollectionBreadcrumbProps) {
  const searchParams = useSearchParams();
  const all = searchParams.get('a') === 'all';
  const router = useRouter();
  const pathname = usePathname();

  // const locale = useLocale();
  const changeASearchParams = (a: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete('a');
    newParams.delete('category');
    if (a) newParams.set('a', a);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const t = useTranslations('product');

  return (
    <Grid className="fixed top-[120px] z-10 h-[73px] w-full bg-white pb-[10px] pt-[50px] laptop:top-[74px]">
      <div
        className="col-span-2 flex cursor-pointer select-none overflow-hidden uppercase laptop:col-span-3"
        onClick={onClick}
      >
        <p className="text-mud laptop:hidden">{t(prefix).substring(0, 3)}:</p>
        <p className="hidden text-mud laptop:block">{t(prefix)}:</p>
        <ArrowRightSvg className="ml-[6px] mr-[2px] w-[11px] shrink-0 fill-current text-clay-dark" />
        <p className="truncate text-clay-dark">{name}</p>
      </div>
      <div className="col-span-2 flex select-none gap-[10px] uppercase text-clay-dark laptop:col-span-3">
        <p
          onClick={() => changeASearchParams('')}
          className={twMerge('cursor-pointer', !all ? 'text-mud' : '')}
        >
          {t('available')}
        </p>
        <p>/</p>
        <p
          onClick={() => changeASearchParams('all')}
          className={twMerge('cursor-pointer', all ? 'text-mud' : '')}
        >
          {t('all')}
        </p>
      </div>
    </Grid>
  );
}
