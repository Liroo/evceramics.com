import LeftArrow from 'icons/arrowLeft-Caroussel.svg';
import { Product } from 'lib/shopify/types';
import { useState } from 'react';

type CarousselProps = {
  imageInfo: Product;
};

export default function Caroussel({ imageInfo }: CarousselProps) {
  const [index, setIndex] = useState<number>(0);

  const handleArrowNext = () => {
    setIndex((index + 1) % imageInfo.images.length);
  };

  const handleArrowPrev = () => {
    setIndex((index + imageInfo.images.length - 1) % imageInfo.images.length);
  };

  return (
    <div className=" relative flex h-[550px] w-full items-center justify-center laptop:hidden">
      <img className="h-full w-full" src={imageInfo.images[index]?.url} alt="Caroussel image" />
      <div className="absolute flex w-full  justify-between ">
        <div className="targeting-action p-[12px]" onClick={() => handleArrowPrev()}>
          <LeftArrow className=" h-[23px] w-[23px] rotate-180 rounded-full bg-white fill-current " />
        </div>
        <div className="targeting-action p-[12px]" onClick={() => handleArrowNext()}>
          <LeftArrow className=" h-[23px] w-[23px] rounded-full bg-white fill-current " />
        </div>
      </div>
    </div>
  );
}
