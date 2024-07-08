'use client';

import Grid from 'components/grid';
import { AnimatePresence, motion } from 'framer-motion';
import { Product } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import CollectionProduct from './product';

type CollectionProps = {
  products: Product[];
};

export default function CollectionProducts({ products }: CollectionProps) {
  const t = useTranslations('product');

  const searchParams = useSearchParams();
  const key = searchParams.toString();

  return (
    <Grid>
      {products.length === 0 && (
        <p className="col-span-4 uppercase text-clay-dark">{t('no-products')}</p>
      )}
      <AnimatePresence mode="wait">
        {products.map((product) => (
          <motion.div
            key={`${product.id}-${key}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="col-span-4 mb-[10px] laptop:col-span-3"
          >
            <CollectionProduct key={product.id} product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Grid>
  );
}
