import PageTransition from 'components/animation/pageTransition';
import Grid from 'components/grid';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { ForwardedRef, forwardRef } from 'react';

function Page({}, ref: ForwardedRef<HTMLDivElement>) {
  const t = useTranslations('error');

  return (
    <PageTransition ref={ref}>
      <div className="text-body flex-col pb-[20px] pt-[40px] laptop:pt-[74px]">
        <Grid className="w-full bg-[#F4F4F4] pb-[10px] pt-[50px]">
          <p className="text-heading-5">{t('404.title')}</p>
          <p className=" col-span-2">{t('404.content')}</p>
        </Grid>
      </div>
    </PageTransition>
  );
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
};

export default forwardRef(Page);
