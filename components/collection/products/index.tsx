'use client';

import Grid from 'components/grid';
import { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import CollectionProduct from './product';

type CollectionProps = {
  products: Product[];
};

export default function CollectionProducts({ products }: CollectionProps) {
  const t = useTranslations('product');

  return (
    <Grid>
      {products.length === 0 && (
        <p className="col-span-4 uppercase text-clay-dark">{t('no-products')}</p>
      )}
      {products.map((product) => (
        <CollectionProduct key={product.id} product={product} />
      ))}
    </Grid>
  );
}
