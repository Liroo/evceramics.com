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
    <div className="pb-[20px] pt-[16px] laptop:pb-0 laptop:pt-0">
      <p className="px-[10px] font-romie text-[24px] italic laptop:px-0 laptop:text-[20px]">
        Related products
      </p>
      <GridCart className="mt-[15px] px-0 laptop:mt-[20px]">
        <div className="col-span-4 flex gap-[var(--grid-col-gap)] overflow-x-scroll px-[10px] laptop:col-span-2 laptop:px-0">
          {productRecommendations.map((product, i) => {
            return (
              <Link
                key={i}
                href={`/product/${product.handle}`}
                className="targeting-action aspect-[62/82] w-[calc((100vw-20px)/4*3)] min-w-[calc((100vw-20px)/4*3)] bg-clay laptop:w-[calc((100%-var(--grid-col-gap)*2)/3)] laptop:min-w-px"
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
