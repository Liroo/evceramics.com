import { Product } from 'lib/shopify/types';

type CarousselProps = {
  imageInfo: Product;
};

export default function Caroussel({ imageInfo }: CarousselProps) {
  const imageArray = imageInfo.images;
  console.log(imageArray);
  return (
    <div className="hidden w-full flex-col laptop:flex laptop:overflow-y-scroll ">
      {imageArray.map((image, i) => {
        console.log(image);
        return <img className="cover mb-[20px]" key={i} src={image.url} alt="Animation img" />;
      })}
    </div>
  );
}
