'use client';

import AnimationOpacityIn from 'components/animation/opacityIn';
import { motion } from 'framer-motion';
import ComingSoonSvg from 'icons/coming-soon.svg';
import EvCeramicsVerticalSvg from 'icons/evceramics-vertical.svg';
import ComingSoonGif from './gif';

export default function ComingSoon() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute top-0 z-50 flex h-dvh w-screen flex-col"
        initial={{
          y: 0,
        }}
      >
        <div className="relative z-20 mx-auto mt-[10%]">
          <AnimationOpacityIn className="mb-[30px] laptop:mb-[50px]" delay={1}>
            <ComingSoonSvg className="w-[80vw] laptop:w-[30vw]" />
          </AnimationOpacityIn>
        </div>
        <motion.div
          className="absolute left-0 top-0 z-10 h-full w-full"
          initial={{
            y: 0,
          }}
        >
          <ComingSoonGif />
        </motion.div>

        <div className="mx-auto mt-auto w-screen px-[16px] laptop:px-[32px]">
          <AnimationOpacityIn className="mb-[30px] laptop:mb-[50px]" delay={1}>
            <EvCeramicsVerticalSvg className="w-full fill-current text-clay-dark" />
          </AnimationOpacityIn>
        </div>
      </motion.div>
    </>
  );
}
