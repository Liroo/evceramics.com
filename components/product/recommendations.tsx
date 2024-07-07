import GridCart from 'components/grid/cart';
import { Link } from 'lib/navigation';
import { Product } from 'lib/shopify/types';

export default function ProductRecommendations({
  productRecommendations,
}: {
  productRecommendations: Product[];
}) {
  if (productRecommendations.length === 0) return null;

  return (
    <div className="pt-[36px] laptop:pt-0">
      <p className="font-romie text-[24px] italic laptop:text-[20px]">Related products</p>
      <GridCart className="mt-[15px] px-0 laptop:mt-[20px]">
        <div className="col-span-4 flex gap-[var(--grid-col-gap)] overflow-x-scroll laptop:col-span-2">
          {productRecommendations.map((product, i) => {
            return (
              <Link
                key={i}
                href={`/product/${product.handle}`}
                className="aspect-[62/82] w-[calc((100vw-20px)/4*3)] min-w-[calc((100vw-20px)/4*3)] bg-clay laptop:w-[calc((100%-var(--grid-col-gap)*2)/3)] laptop:min-w-px"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={product.featuredImage.altText}
                  src={product.featuredImage.url}
                  className="h-full w-full object-cover"
                />
              </Link>
            );
          })}
        </div>
      </GridCart>
    </div>
  );
}
