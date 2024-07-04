'use client';

import AnimationOpacityIn from 'components/animation/opacityIn';
import IntroGif from 'components/intro/gif';
import { cubicBezier, motion, useAnimate } from 'framer-motion';
import EvCeramicsVerticalSvg from 'icons/evceramics-vertical.svg';
import { SessionStorage } from 'lib/storage';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Intro({ children }: Props) {
  const [containerScope, containerAnimate] = useAnimate();
  const [childrenScope, childrenAnimate] = useAnimate();
  const [gifScope, gifAnimate] = useAnimate();
  const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);

  useEffect(() => {
    const introCompleted: boolean = SessionStorage.get('introCompleted');

    if (!introCompleted) {
      window.dispatchEvent(new CustomEvent('intro:animation', { detail: true }));
      document.body.classList.add('overflow-y-hidden');
      document.documentElement.classList.add('overflow-y-hidden');

      containerAnimate(
        containerScope.current,
        {
          y: '-100%',
        },
        {
          delay: 4.5,
          duration: 0.7,
          ease: cubicBezier(0.76, 0, 0.24, 1),
          onComplete: () => {
            setAnimationCompleted(true);
            SessionStorage.set('introCompleted', true);
            document.body.classList.remove('overflow-y-hidden');
            document.documentElement.classList.remove('overflow-y-hidden');
          },
        },
      );
      gifAnimate(
        gifScope.current,
        {
          y: '-30%',
        },
        {
          delay: 4.45,
          duration: 0.7,
          ease: 'easeInOut',
        },
      );
      childrenAnimate(
        childrenScope.current,
        {
          y: 0,
        },
        {
          delay: 4.5,
          duration: 0.7,
          ease: cubicBezier(0.76, 0, 0.24, 1),
        },
      );
    } else {
      window.dispatchEvent(new CustomEvent('intro:animation', { detail: false }));
      childrenAnimate(
        childrenScope.current,
        {
          y: 0,
        },
        {
          duration: 0,
        },
      );
      setAnimationCompleted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!animationCompleted && (
        <motion.div
          ref={containerScope}
          className="pointer-events-none absolute top-0 z-50 flex h-dvh w-screen"
          initial={{
            y: 0,
          }}
          onAnimationComplete={() => setAnimationCompleted(true)}
        >
          <motion.div
            ref={gifScope}
            className="absolute left-0 top-0 z-10 h-full w-full"
            initial={{
              y: 0,
            }}
          >
            <IntroGif />
          </motion.div>

          <div className="mx-auto mt-auto w-screen px-[16px] laptop:px-[32px]">
            <AnimationOpacityIn className="mb-[30px] laptop:mb-[50px]" delay={1}>
              <EvCeramicsVerticalSvg className="w-full fill-current text-clay-dark" />
            </AnimationOpacityIn>
          </div>
        </motion.div>
      )}
      <motion.div
        ref={childrenScope}
        className="h-full"
        initial={{
          y: '100%',
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
