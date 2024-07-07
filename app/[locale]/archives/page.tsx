import Archives from 'components/archives';
import { getMetaobject } from 'lib/shopify';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function InfosPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  const metaobject = await getMetaobject('archives', 'archives');

  return <Archives gallery={metaobject?.gallery || []} />;
}
