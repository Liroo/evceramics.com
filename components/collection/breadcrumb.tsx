'use client';

import Grid from 'components/grid';
import { usePathname } from 'i18n/routing';
import ArrowRightSvg from 'icons/arrow-right.svg';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

type CollectionBreadcrumbProps = {
  prefix: string;
  name: string;
  onClick?: () => void;
};

export default function CollectionBreadcrumb({ prefix, name, onClick }: CollectionBreadcrumbProps) {
  const router = useRouter();
  const available = router.query.a === 'available';
  const pathname = usePathname();

  const changeASearchParams = (a: string) => {
    const newParams = new URLSearchParams(window.location.search);

    newParams.delete('a');
    newParams.delete('category');
    if (a) newParams.set('a', a);
    router.replace(`${pathname}?${newParams.toString()}`, undefined, { shallow: true });
  };

  const t = useTranslations('product');

  const prefixTranslated = t(prefix);

  return (
    <Grid className="fixed top-[120px] z-10 h-[73px] w-full bg-[#F4F4F4] pb-[10px] pt-[50px] laptop:top-[74px]">
      <div
        className="targeting-action col-span-2 flex select-none overflow-hidden uppercase laptop:col-span-3"
        onClick={onClick}
      >
        <p className="text-mud laptop:hidden">
          {prefixTranslated.length > 4 ? prefixTranslated.substring(0, 3) : prefixTranslated}:
        </p>
        <p className="hidden text-mud laptop:block">{prefixTranslated}:</p>
        <ArrowRightSvg className="ml-[6px] mr-[2px] w-[11px] shrink-0 fill-current text-clay-dark" />
        <p className="truncate text-clay-dark">{name}</p>
      </div>
      <div className="col-span-2 flex select-none gap-[10px] uppercase text-clay-dark laptop:col-span-3">
        <p
          onClick={() => changeASearchParams('available')}
          className={twMerge('targeting-action', available ? 'text-mud' : '')}
        >
          {t('available')}
        </p>
        <p>/</p>
        <p
          onClick={() => changeASearchParams('')}
          className={twMerge('targeting-action', !available ? 'text-mud' : '')}
        >
          {t('all')}
        </p>
      </div>
    </Grid>
  );
}
