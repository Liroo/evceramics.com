'use client';

import { cubicBezier, motion, useAnimate } from 'framer-motion';

import EVCeramicsHorizontalSvg from 'icons/evceramics-horizontal.svg';
import { usePathname, useRouter } from 'lib/navigation';
import { Menu } from 'lib/shopify/types';
import { SessionStorage } from 'lib/storage';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  menu: Menu[];
};

function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  console.log(params);

  const switchLocale = (nextLocale: string) => {
    if (locale !== nextLocale) {
      const queryObject: any = {};
      Array.from(searchParams.entries()).forEach(([key, value]) => {
        queryObject[key] = value;
      });
      router.replace(
        {
          pathname,
          params,
          query: queryObject,
        } as any,
        { locale: nextLocale },
      );
    }
  };

  return (
    <div className="flex select-none gap-[10px] text-clay-dark">
      <div
        onClick={() => switchLocale('en')}
        className={twMerge('cursor-pointer select-none', locale === 'en' ? 'text-mud' : '')}
      >
        EN
      </div>
      <p>/</p>
      <div
        onClick={() => switchLocale('fr')}
        className={twMerge('cursor-pointer select-none', locale === 'fr' ? 'text-mud' : '')}
      >
        FR
      </div>
    </div>
  );
}

function MainMenu({ menu }: Props) {
  let pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="flex select-none flex-col gap-[6px] text-clay-dark laptop:flex-row laptop:gap-0">
      {menu.map((item, index) => (
        <Fragment key={index}>
          {index > 0 ? <p className="mx-[10px] hidden laptop:block">/</p> : null}
          <Link href={item.path} locale={locale} className="uppercase">
            <p className={twMerge(pathname === item.path ? 'text-mud' : '')}>{item.title}</p>
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

export default function LayoutNavbar({ menu }: Props) {
  let pathname = usePathname();
  const t = useTranslations('menu');

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Intro animation
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
      className="text-menu fixed left-0 top-0 z-50 flex h-[40px] w-full flex-col items-stretch justify-center bg-white laptop:h-[74px]"
      initial={{
        y: pathname === '/' ? '100dvh' : 0,
      }}
    >
      <div className="mx-[10px] grid grid-cols-4 items-center gap-[10px] laptop:hidden">
        <div className="col-span-2">
          <p className="uppercase">EVCERAMICS</p>
        </div>
        <div className="col-span-1">
          <p className="uppercase">{t('cart')} (0)</p>
        </div>
        <div className="col-span-1 m-[-10px] justify-self-end p-[10px]" onClick={toggleMobileMenu}>
          <p className="uppercase">MENU</p>
        </div>
      </div>
      <div
        className={twMerge(
          'fixed left-0 top-[40px] grid w-full bg-white transition-all laptop:hidden',
          mobileMenuOpen ? 'grid grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-[10px] mb-[6px] mt-[6px] grid grid-cols-4 items-start gap-[10px]">
            <div className="col-span-2 col-start-1 flex flex-col">
              <MainMenu menu={menu} />
            </div>
            <div className="col-span-2 col-start-3 flex flex-col gap-[6px]">
              <LocaleSwitcher />
              <a href="https://www.instagram.com/ev_ceramiques" target="_blank">
                INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden grid-cols-12 items-center gap-[16px] px-[32px] laptop:grid">
        <EVCeramicsHorizontalSvg className="col-span-2" />

        <div className="col-span-3 col-start-4 flex flex-col gap-[2px]">
          <p>EVCERAMICS</p>
          <MainMenu menu={menu} />
        </div>

        <div className="col-span-3 col-start-7 flex flex-col gap-[2px]">
          <p className="uppercase">{t('handmade-ceramics')}</p>
          <p className="uppercase">{t('based-in-france')}</p>
        </div>

        <div className="col-span-2 col-start-10 flex flex-col gap-[2px]">
          <LocaleSwitcher />
          <a href="https://www.instagram.com/ev_ceramiques" target="_blank">
            INSTAGRAM
          </a>
        </div>

        <div className="col-span-1 col-start-12 flex flex-col gap-[2px] justify-self-end">
          <p>{t('cart')}</p>
          <p>(0)</p>
        </div>
      </div>
    </motion.nav>
  );
}
