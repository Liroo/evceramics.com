'use client';
import CollectionBreadcrumb from 'components/collection/breadcrumb';
import CollectionMenu from 'components/collection/menu';
import CollectionProducts from 'components/collection/products';
import { usePathname } from 'i18n/routing';
import EVCeramicsHorizontalSvg from 'icons/evceramics-horizontal.svg';
import { Menu, Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { Suspense, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ShopMenu = {
  handle: string;
} & Menu;

export default function Shop({
  collectionHandle,
  menu,
  products,
}: {
  collectionHandle: string;
  menu: ShopMenu[];
  products: Product[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { category, a } = router.query as { category: string; a: string };
  const t = useTranslations('product');

  // Get the type and availability filters
  let filteredProducts = products;

  // Filter by category
  const productsCategories = products.reduce((acc, product) => {
    const productType = product.category?.value;
    if (a === 'available' && !product.availableForSale) return acc;
    if (productType) {
      if (!acc.includes(productType)) acc.push(productType);
    }
    return acc;
  }, [] as string[]);
  let serializedCategory = null;
  if (category) {
    // ensure t is a valid type
    const foundType = productsCategories.find(
      (productType) => productType.replace(' ', '-').toLowerCase() === decodeURIComponent(category),
    );
    if (foundType) serializedCategory = foundType;
  }
  filteredProducts = filteredProducts.filter((product) =>
    serializedCategory ? product.category?.value === serializedCategory : true,
  );

  // Filter by availability
  filteredProducts = filteredProducts.filter((product) =>
    a === 'available' ? product.availableForSale : true,
  );

  // Menu logic
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const onClickMenu = (drop: string | null, category?: string | null) => {
    const newParams = new URLSearchParams(window.location.search);
    if (drop !== collectionHandle) {
      router.replace(`/shop/${drop}`, undefined, { shallow: false });
      return;
    }
    newParams.delete('category');
    if (category) newParams.set('category', category);
    router.replace(`${pathname}?${newParams.toString()}`, undefined, { shallow: true });
    if (window.innerWidth < 640) setMenuIsOpen(false);
  };

  return (
    <div className="text-body flex-col pb-[20px] pt-[40px] laptop:pt-[74px]">
      <div className="fixed top-[40px] z-10 h-[80px] w-full bg-[#F4F4F4] px-[var(--grid-col-px)] pt-[34px]">
        <EVCeramicsHorizontalSvg className="w-[300px] laptop:hidden" />
      </div>
      <Suspense>
        <CollectionBreadcrumb
          prefix="drop"
          name={menu.find((menu) => menu.handle === collectionHandle)?.title || ''}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        />
      </Suspense>
      <CollectionMenu
        open={menuIsOpen}
        menu={[
          ...menu.map((menu) => ({
            value: menu.handle,
            label: menu.title,
            active: collectionHandle === menu.handle,
            children:
              collectionHandle === menu.handle
                ? [
                    {
                      value: null,
                      label: t('all'),
                      active: !category,
                    },
                    ...productsCategories.map((category) => ({
                      value: category.replace(' ', '-').toLowerCase(),
                      label: category,
                      active: category === serializedCategory,
                    })),
                  ]
                : undefined,
          })),
        ]}
        onClick={onClickMenu}
      />
      <div
        className={twMerge(
          'overflow-hidden pt-[152px] transition-transform duration-300 laptop:pt-[73px]',
          menuIsOpen
            ? 'translate-x-[calc((100vw-2*var(--grid-col-px)-(var(--grid-col-nb)-1)*var(--grid-col-gap))/var(--grid-col-nb)*2+2*var(--grid-col-gap))]'
            : '',
        )}
      >
        <CollectionProducts products={filteredProducts} />
      </div>
    </div>
  );
}
