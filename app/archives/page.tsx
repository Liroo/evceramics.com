import Archives from 'components/archives';
import { getMetaobject } from 'lib/shopify';

export const metadata = {
  title: 'Archives',
  description:
    'EV Ceramics is a ceramic studio run by Emilie Vizcano. All the pieces she makes are handmade, one by one, using the modelling technique.',
  openGraph: {
    type: 'website',
  },
};

export default async function InfosPage() {
  const metaobject = await getMetaobject('archives', 'archives');

  return <Archives gallery={metaobject?.gallery || []} />;
}
