'use client';

import AnimationOpacityIn from 'components/animation/opacityIn';
import { animate, motion } from 'framer-motion';
import useResizeObserver from 'hooks/useResizeObserver';
import Image from 'next/image';
import IntroGif1Jpg from 'public/images/intro/intro-gif-1.jpg';
import IntroGif2Jpg from 'public/images/intro/intro-gif-2.jpg';
import IntroGif3Jpg from 'public/images/intro/intro-gif-3.jpg';
import IntroGif4Jpg from 'public/images/intro/intro-gif-4.jpg';
import IntroGif5Jpg from 'public/images/intro/intro-gif-5.jpg';
import IntroGif6Jpg from 'public/images/intro/intro-gif-6.jpg';
import IntroGif7Jpg from 'public/images/intro/intro-gif-7.jpg';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const images = [
  IntroGif1Jpg,
  IntroGif2Jpg,
  IntroGif3Jpg,
  IntroGif4Jpg,
  IntroGif5Jpg,
  IntroGif6Jpg,
  IntroGif7Jpg,
];

export default function IntroGif() {
  const { ref, rect } = useResizeObserver<HTMLDivElement>();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    animate(0, 4, {
      onUpdate: (value) => {
        const nextIndex = Math.floor(value) % images.length;
        if (nextIndex !== index) setIndex(nextIndex);
      },
      duration: 2.5,
      ease: 'linear',
      delay: 1.6,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-[90%] w-full items-center justify-center">
      <div
        ref={ref}
        className="absolute aspect-[216/286] w-[55vw] tablet:w-[40vw] laptop:w-[25vw] desktop:w-[15vw]"
      >
        <AnimationOpacityIn delay={1.5}>
          <motion.div
            initial={{
              height: 0,
            }}
            animate={{
              height: rect?.height,
            }}
            transition={{
              delay: 1.5,
            }}
          >
            {images.map((image, i) => (
              <Image
                key={i}
                src={image}
                alt="intro-gif"
                className={twMerge(
                  'absolute h-full w-full object-cover',
                  index === i ? 'z-10' : 'z-0',
                )}
              />
            ))}
          </motion.div>
        </AnimationOpacityIn>
      </div>
    </div>
  );
}
