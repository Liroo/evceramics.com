'use client';

import CollectionBreadcrumb from 'components/collection/breadcrumb';
import CollectionMenu from 'components/collection/menu';
import CollectionProducts from 'components/collection/products';
import EVCeramicsHorizontalSvg from 'icons/evceramics-horizontal.svg';
import { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { Suspense, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Home({ products }: { products: Product[] }) {
  const { category, a } = useRouter().query as { category: string; a: string };

  // Get the type and availability filters
  let filteredProducts = products;

  // Filter by type
  const productsTypes = products.reduce((acc, product) => {
    const productType = product.category?.value;
    if (a === 'available' && !product.availableForSale) return acc;
    if (productType) {
      if (!acc.includes(productType)) acc.push(productType);
    }
    return acc;
  }, [] as string[]);
  let serializedType = null;
  if (category) {
    // ensure t is a valid type
    const foundType = productsTypes.find(
      (productType) => productType.replace(' ', '-').toLowerCase() === decodeURIComponent(category),
    );
    if (foundType) serializedType = foundType;
  }
  filteredProducts = filteredProducts.filter((product) =>
    serializedType ? product.category?.value === serializedType : true,
  );

  // Filter by availability
  filteredProducts = filteredProducts.filter((product) =>
    a === 'available' ? product.availableForSale : true,
  );

  // Menu logic
  const router = useRouter();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const t = useTranslations('product');

  const onClickMenu = (value: string | null) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete('category');
    if (value) newParams.set('category', value);
    router.replace(`/?${newParams.toString()}`, undefined, { shallow: true });
  };

  return (
    <div className="text-body flex-col pb-[20px] pt-[40px] laptop:pt-[74px]">
      <div className="fixed top-[40px] z-10 h-[80px] w-full bg-[#F4F4F4] px-[var(--grid-col-px)] pt-[34px]">
        <EVCeramicsHorizontalSvg className="w-[300px] laptop:hidden" />
      </div>
      <Suspense>
        <CollectionBreadcrumb
          prefix="category"
          name={serializedType ? serializedType : t('all')}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        />
      </Suspense>
      <CollectionMenu
        open={menuIsOpen}
        menu={[
          { value: null, label: t('all'), active: !category },
          ...productsTypes.map((productType) => ({
            value: productType.replace(' ', '-').toLowerCase(),
            label: productType,
            active: productType === serializedType,
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
