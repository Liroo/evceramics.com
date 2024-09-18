'use client';

import { useCart } from '@shopify/hydrogen-react';
import Cart from 'components/cart';
import { cubicBezier, motion, useAnimate } from 'framer-motion';

import EVCeramicsHorizontalSvg from 'icons/evceramics-horizontal.svg';
import { setUserLocale } from 'lib/locale';
import { Menu } from 'lib/shopify/types';
import { SessionStorage } from 'lib/storage';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from 'next-transition-router';
import { usePathname } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState, useTransition } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  menu: Menu[];
};

function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  const switchLocale = (nextLocale: string) => {
    if (locale !== nextLocale) {
      startTransition(() => {
        console.log(locale);
        setUserLocale(nextLocale);
      });
    }
  };

  console.log(isPending);

  return (
    <div className="flex select-none gap-[10px] text-clay-dark">
      <div
        onClick={() => switchLocale('en')}
        className={twMerge('targeting-action select-none', locale === 'en' ? 'text-mud' : '')}
      >
        EN
      </div>
      <p>/</p>
      <div
        onClick={() => switchLocale('fr')}
        className={twMerge('targeting-action select-none', locale === 'fr' ? 'text-mud' : '')}
      >
        FR
      </div>
    </div>
  );
}

function MainMenu({ menu }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex select-none flex-col flex-wrap gap-[6px] text-clay-dark laptop:flex-row laptop:gap-0">
      {menu.map((item, index) => (
        <Fragment key={index}>
          {index > 0 ? <p className="mx-[10px] hidden laptop:block">/</p> : null}
          <Link href={item.path} className="targeting-action whitespace-nowrap uppercase">
            <p
              className={twMerge(
                pathname === item.path ||
                  (item.path === '/shop' && pathname.startsWith('/shop') && pathname)
                  ? 'text-mud'
                  : '',
              )}
            >
              {item.title}
            </p>
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

export default function LayoutNavbar({ menu }: Props) {
  const pathname = usePathname();
  const t = useTranslations('menu');

  // Cart
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cart = useCart();
  const onToggleCart = () => setCartOpen((prev) => !prev);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide navbar
  const [hideNavbar, setHideNavbar] = useState<boolean>(false);

  useEffect(() => {
    const onNavbarVisibility = (event: CustomEvent<boolean>) => {
      setHideNavbar(event.detail);
    };
    window.addEventListener<any>('navbar-visibility', onNavbarVisibility);
    return () => {
      window.removeEventListener<any>('navbar-visibility', onNavbarVisibility);
    };
  }, []);

  // setHideNavbar(true);
  return (
    <>
      <motion.nav
        ref={scope}
        className="text-menu fixed left-0 top-0 z-50 flex h-[40px] w-full flex-col items-stretch justify-center bg-[#F4F4F4] laptop:h-[74px]"
        initial={{
          y: pathname === '/' ? '100dvh' : 0,
        }}
      >
        <div className="mx-[10px] grid grid-cols-4 items-center gap-[10px] laptop:hidden">
          <div className="col-span-2">
            <p className="uppercase">EVCERAMICS</p>
          </div>
          <div className="col-span-1">
            <p className="targeting-action select-none uppercase" onClick={onToggleCart}>
              {t('cart')} ({cart.totalQuantity ?? 0})
            </p>
          </div>
          <div
            className="targeting-action col-span-1 m-[-10px] select-none justify-self-end p-[10px]"
            onClick={toggleMobileMenu}
          >
            <p className="uppercase">MENU</p>
          </div>
        </div>
        <div className="hidden grid-cols-12 items-center gap-[16px] px-[32px] laptop:grid">
          <Link href="/" className="targeting-action col-span-2">
            <EVCeramicsHorizontalSvg />
          </Link>

          <div
            className={twMerge(
              'col-span-3 col-start-4 flex flex-col gap-[2px] transition-opacity duration-200',
              hideNavbar ? 'laptop:pointer-events-none laptop:opacity-0' : '',
            )}
          >
            <p>EVCERAMICS</p>
            <MainMenu menu={menu} />
          </div>

          <div
            className={twMerge(
              'col-span-3 col-start-7 flex flex-col gap-[2px] transition-opacity duration-200',
              hideNavbar ? 'laptop:pointer-events-none laptop:opacity-0' : '',
            )}
          >
            <p className="uppercase">{t('handmade-ceramics')}</p>
            <p className="uppercase">{t('based-in-france')}</p>
          </div>

          <div className="col-span-2 col-start-10 flex flex-col gap-[2px]">
            <LocaleSwitcher />
            <a
              href="https://www.instagram.com/ev_ceramiques"
              target="_blank"
              className="targeting-action"
            >
              INSTAGRAM
            </a>
          </div>

          <div
            className="targeting-action col-span-1 col-start-12 flex select-none flex-col gap-[2px] justify-self-end"
            onClick={onToggleCart}
          >
            <p>{t('cart')}</p>
            <p>({cart.totalQuantity ?? 0})</p>
          </div>
        </div>
      </motion.nav>
      <div
        className={twMerge(
          'fixed left-0 top-[40px] z-[4000] grid w-full bg-[#F4F4F4] transition-all laptop:hidden',
          mobileMenuOpen ? 'grid grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-[10px] mb-[6px] mt-[6px] grid grid-cols-4 items-start gap-[10px]">
            <div className="col-span-2 col-start-1 flex flex-col">
              <MainMenu menu={menu} />
            </div>
            <div className="col-span-2 col-start-3 flex flex-col gap-[6px]">
              <Suspense>
                <LocaleSwitcher />
              </Suspense>
              <a
                href="https://www.instagram.com/ev_ceramiques"
                target="_blank"
                className="targeting-action"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </div>
      <Cart open={cartOpen} onCloseCart={() => setCartOpen(false)} />
    </>
  );
}
