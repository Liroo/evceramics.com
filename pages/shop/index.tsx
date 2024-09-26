import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import { GetServerSidePropsContext } from 'next';

export default async function ShopPage() {
  return null;
}

export const getServerSideProps = async ({ locale }: GetServerSidePropsContext) => {
  const promises = [getMenu('shop', (locale as string).toUpperCase())];

  const [menu] = await Promise.all(promises);

  const shopMenu = (menu as Menu[]).map((item) => ({
    ...item,
    handle: item.path.replace('/collections/', ''),
  }));
  if (!shopMenu || shopMenu.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: `/${locale}/shop/${shopMenu[0]?.handle}`,
      permanent: false,
    },
  };
};
