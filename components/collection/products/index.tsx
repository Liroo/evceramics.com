import Grid from 'components/grid';
import { Product } from 'lib/shopify/types';
import CollectionProduct from './product';

type CollectionProps = {
  products: Product[];
};

export default function CollectionProducts({ products }: CollectionProps) {
  return (
    <Grid>
      {products.map((product) => (
        <CollectionProduct key={product.id} product={product} />
      ))}
    </Grid>
  );
}
