import { getMenu } from 'lib/shopify';
import { getLocale } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';

export default async function ShopPage() {
  const locale = await getLocale();

  const menu = await getMenu('shop', locale.toUpperCase());
  const shopMenu = menu.map((item) => ({
    ...item,
    handle: item.path.replace('/collections/', ''),
  }));
  if (!shopMenu || shopMenu.length === 0) {
    return notFound();
  }

  redirect(`/shop/${shopMenu[0]?.handle}`);
}
