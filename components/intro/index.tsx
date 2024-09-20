'use client';

import anime from 'animejs';
import AnimationOpacityIn from 'components/animation/opacityIn';
import IntroGif from 'components/intro/gif';
import EvCeramicsVerticalSvg from 'icons/evceramics-vertical.svg';
import { SessionStorage } from 'lib/storage';
import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Intro({ children }: Props) {
  const containerScope = useRef<HTMLDivElement>(null);
  const childrenScope = useRef<HTMLDivElement>(null);
  const gifScope = useRef<HTMLDivElement>(null);
  const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);

  useEffect(() => {
    const introCompleted: boolean = SessionStorage.get('introCompleted');

    if (!introCompleted) {
      window.dispatchEvent(new CustomEvent('intro:animation', { detail: true }));
      document.body.classList.add('overflow-y-hidden');
      document.documentElement.classList.add('overflow-y-hidden');

      const timeline = anime.timeline({
        complete: () => {
          setAnimationCompleted(true);
          SessionStorage.set('introCompleted', true);
          document.body.classList.remove('overflow-y-hidden');
          document.documentElement.classList.remove('overflow-y-hidden');
        },
      });
      timeline.add(
        {
          targets: containerScope.current,
          translateY: [0, '-100%'],
          duration: 700,
          easing: 'cubicBezier(0.76, 0, 0.24, 1)',
        },
        4500,
      );
      timeline.add(
        {
          targets: gifScope.current,
          translateY: [0, '-30%'],
          duration: 700,
          easing: 'easeInOutQuad',
        },
        '-=50',
      );
      timeline.add(
        {
          targets: childrenScope.current,
          translateY: ['100%', 0],
          duration: 700,
          easing: 'cubicBezier(0.76, 0, 0.24, 1)',
        },
        4500,
      );
    } else {
      window.dispatchEvent(new CustomEvent('intro:animation', { detail: false }));
      anime({
        targets: containerScope.current,
        translateY: 0,
        duration: 0,
      });

      setAnimationCompleted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!animationCompleted && (
        <div
          ref={containerScope}
          className="pointer-events-none absolute top-0 z-50 flex h-dvh w-screen"
        >
          <div ref={gifScope} className="absolute left-0 top-0 z-10 h-full w-full">
            <IntroGif />
          </div>

          <div className="mx-auto mt-auto w-screen px-[16px] laptop:px-[32px]">
            <AnimationOpacityIn className="mb-[30px] laptop:mb-[50px]" delay={1}>
              <EvCeramicsVerticalSvg className="w-full fill-current text-clay-dark" />
            </AnimationOpacityIn>
          </div>
        </div>
      )}
      <div ref={childrenScope} className="h-full">
        {children}
      </div>
    </>
  );
}
