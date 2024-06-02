'use client';

import { cubicBezier, motion, useAnimate } from 'framer-motion';

import EVCeramicsHorizontalSvg from 'icons/evceramics-horizontal.svg';
import { SessionStorage } from 'lib/storage';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LayoutNavbar() {
  const pathname = usePathname();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // JIC the user navigates away before the intro is completed
    // Or if the user is coming from another page than the homepage
    setTimeout(() => {
      SessionStorage.set('introCompleted', true);
    }, 1000);
  }, []);

  useEffect(() => {
    const onIntroAnimation = (event: CustomEvent<boolean>) => {
      animate(
        scope.current,
        {
          y: 0,
        },
        {
          delay: event.detail ? 4.5 : 0,
          duration: event.detail ? 0.7 : 0,
          ease: cubicBezier(0.76, 0, 0.24, 1),
        },
      );
    };
    window.addEventListener<any>('intro:animation', onIntroAnimation);
    return () => {
      window.removeEventListener<any>('intro:animation', onIntroAnimation);
    };
  }, []);

  return (
    <motion.nav
      ref={scope}
      className="text-menu fixed left-0 top-0 z-50 flex h-[74px] w-full justify-center bg-white"
      initial={{
        y: pathname === '/' ? '100dvh' : 0,
      }}
    >
      <div className="grid w-full max-w-desktop grid-cols-12 items-center gap-[16px] px-[32px]">
        <EVCeramicsHorizontalSvg className="col-span-2" />

        <div className="col-span-3 col-start-4">
          <p>EVCERAMICS</p>
        </div>

        <div className="col-span-3 col-start-7">
          <p>HANDMADE CERAMICS</p>
          <p>BASED IN FRANCE</p>
        </div>

        <div className="col-span-1 col-start-10">
          <p>INSTAGRAM</p>
        </div>

        <div className="col-span-1 col-start-12 justify-self-end">
          <p>CART</p>
        </div>
      </div>
    </motion.nav>
  );
}
