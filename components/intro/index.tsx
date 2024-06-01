'use client';

import AnimationTransformIn from 'components/animation/transformIn';
import IntroGif from 'components/intro/gif';
import { cubicBezier, motion } from 'framer-motion';
import EvCeramicsVerticalSvg from 'icons/evceramics-vertical.svg';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Intro({ children }: Props) {
  const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);

  return (
    <>
      {!animationCompleted && (
        <motion.div
          className="pointer-events-none absolute top-0 z-50 flex h-dvh w-screen"
          initial={{
            y: 0,
          }}
          animate={{
            y: '-100%',
          }}
          transition={{
            delay: 4.5,
            duration: 0.7,
            ease: cubicBezier(0.76, 0, 0.24, 1),
          }}
          onAnimationComplete={() => setAnimationCompleted(true)}
        >
          <motion.div
            className="absolute left-0 top-0 z-10 h-full w-full"
            initial={{
              y: 0,
            }}
            animate={{
              y: '-30%',
            }}
            transition={{
              delay: 4.45,
              duration: 0.7,
              ease: 'easeInOut',
            }}
          >
            <IntroGif />
          </motion.div>

          <div className="mx-auto mt-auto w-screen max-w-desktop px-[16px] laptop:px-[32px]">
            <AnimationTransformIn className="mb-[30px] laptop:mb-[50px]" delay={1}>
              <EvCeramicsVerticalSvg className="w-full fill-current text-clay-dark" />
            </AnimationTransformIn>
          </div>
        </motion.div>
      )}
      <motion.div
        className="h-full"
        initial={{
          y: '100%',
        }}
        animate={{
          y: 0,
        }}
        transition={{
          delay: 4.5,
          duration: 0.7,
          ease: cubicBezier(0.76, 0, 0.24, 1),
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
