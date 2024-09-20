import PageTransition from 'components/animation/pageTransition';
import Archives from 'components/archives';
import { getMetaobject } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';
import { GetServerSidePropsContext } from 'next';
import { NextSeo } from 'next-seo';
import { ForwardedRef, forwardRef } from 'react';

function Page(
  {
    metaobject,
  }: {
    metaobject: Metaobject;
  },
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <>
      <NextSeo title="Archives | EV Ceramics" />
      <PageTransition ref={ref}>
        <Archives gallery={metaobject?.gallery || []} />
      </PageTransition>
    </>
  );
}

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const promises = [getMetaobject('archives', 'archives')];

  const [metaobject] = await Promise.all(promises);

  return {
    props: {
      metaobject,
      messages: (await import(`messages/${locale}.json`)).default,
    },
  };
};

export default forwardRef(Page);
