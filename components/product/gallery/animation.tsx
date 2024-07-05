import { Product } from 'lib/shopify/types';

type CarousselProps = {
  imageInfo: Product;
};

export default function Caroussel({ imageInfo }: CarousselProps) {
  const imageArray = imageInfo.images;
  console.log(imageArray);
  return (
    <div className=" w-100  hidden flex-col laptop:flex ">
      {imageArray.map((image, i) => {
        console.log(image);
        return <img className="cover mb-[20px]" src={image.url} alt="Animation img" />;
      })}
      <img className="cover" src={imageInfo.images[0]?.url} alt="Caroussel image" />
    </div>
  );
}
