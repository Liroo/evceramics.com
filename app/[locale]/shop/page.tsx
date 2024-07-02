import { getMenu } from 'lib/shopify';
import { notFound, redirect } from 'next/navigation';

export default async function ShopPage({ params: { locale } }: { params: { locale: string } }) {
  const menu = await getMenu('shop', locale.toUpperCase());
  const shopMenu = menu.map((item) => ({
    ...item,
    handle: item.path.replace('/collections/', ''),
  }));
  if (!shopMenu || shopMenu.length === 0) {
    return notFound();
  }

  console.log(`/shop/${shopMenu[0]?.handle}`);

  redirect(`/shop/${shopMenu[0]?.handle}`);
}
