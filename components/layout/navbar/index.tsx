'use client';

import { cubicBezier, motion, useAnimate } from 'framer-motion';

import EVCeramicsHorizontalSvg from 'icons/evceramics-horizontal.svg';
import { Menu } from 'lib/shopify/types';
import { SessionStorage } from 'lib/storage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  menu: Menu[];
};

function MainMenu({ menu }: Props) {
  const pathName = usePathname();

  return (
    <div className="flex select-none text-clay-dark">
      {menu.map((item, index) => (
        <>
          {index > 0 ? <p className="mx-[10px]">/</p> : null}
          <Link href={item.path} key={index} className="uppercase">
            <p className={twMerge(pathName === item.path ? 'text-mud' : '')}>{item.title}</p>
          </Link>
        </>
      ))}
    </div>
  );
}

export default function LayoutNavbar({ menu }: Props) {
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
      <div className="grid w-full grid-cols-12 items-center gap-[16px] px-[32px]">
        <EVCeramicsHorizontalSvg className="col-span-2" />

        <div className="col-span-3 col-start-4 flex flex-col gap-[2px]">
          <p>EVCERAMICS</p>
          <MainMenu menu={menu} />
        </div>

        <div className="col-span-3 col-start-7 flex flex-col gap-[2px]">
          <p>HANDMADE CERAMICS</p>
          <p>BASED IN FRANCE</p>
        </div>

        <div className="col-span-2 col-start-10 flex flex-col gap-[2px]">
          <p>EN / FR (ou alors pas de langage hein)</p>
          <p>INSTAGRAM</p>
        </div>

        <div className="col-span-1 col-start-12 flex flex-col gap-[2px] justify-self-end">
          <p>CART</p>
          <p>(0)</p>
        </div>
      </div>
    </motion.nav>
  );
}
