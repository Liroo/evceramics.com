import { useCart } from '@shopify/hydrogen-react';
import anime from 'animejs';
import Cart from 'components/cart';
import { usePathname } from 'i18n/routing';

import EVCeramicsHorizontalSvg from 'icons/evceramics-horizontal.svg';
import { SessionStorage } from 'lib/storage';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Fragment, Suspense, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const menu = [
  {
    title: 'lastDrop',
    href: '/',
  },
  {
    title: 'shop',
    href: '/shop',
  },
  {
    title: 'infos',
    href: '/infos',
  },
  {
    title: 'archives',
    href: '/archives',
  },
];

function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex select-none gap-[10px] text-clay-dark">
      <Link
        href={pathname}
        locale={false}
        className={twMerge('targeting-action select-none', locale === 'en' ? 'text-mud' : '')}
      >
        EN
      </Link>
      <p>/</p>
      <Link
        href={pathname}
        locale={'fr'}
        className={twMerge('targeting-action select-none', locale === 'fr' ? 'text-mud' : '')}
      >
        FR
      </Link>
    </div>
  );
}

function MainMenu({ onClick }: { onClick: () => void }) {
  const pathname = usePathname();
  const t = useTranslations('menu');

  return (
    <div className="flex select-none flex-col flex-wrap gap-[6px] text-clay-dark laptop:flex-row laptop:gap-0">
      {menu.map((item, index) => (
        <Fragment key={index}>
          {index > 0 ? <p className="mx-[10px] hidden laptop:block">/</p> : null}
          <Link
            href={item.href}
            className="targeting-action whitespace-nowrap uppercase"
            onClick={onClick}
          >
            <p
              className={twMerge(
                pathname === item.href ||
                  (item.href === '/shop' && pathname.startsWith('/shop') && pathname)
                  ? 'text-mud'
                  : '',
              )}
            >
              {t(item.title)}
            </p>
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

export default function LayoutNavbar() {
  const t = useTranslations('menu');

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Cart
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const cart = useCart();
  const onToggleCart = () => {
    setCartOpen((prev) => !prev);
    setMobileMenuOpen(false);
  };
  useEffect(() => {
    const onOpenCart = () => {
      setCartOpen(true);
    };
    window.addEventListener<any>('open:cart', onOpenCart);
    return () => {
      window.removeEventListener<any>('open:cart', onOpenCart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intro animation
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // JIC the user navigates away before the intro is completed
    // Or if the user is coming from another page than the homepage
    setTimeout(() => {
      SessionStorage.set('introCompleted', true);
    }, 1000);
  }, []);

  useEffect(() => {
    const onIntroAnimation = (event: CustomEvent<boolean>) => {
      if (event.detail)
        anime({
          targets: scope.current,
          translateY: [window.innerHeight, 0],
          duration: event.detail ? 700 : 0,
          delay: event.detail ? 4500 : 0,
          easing: 'cubicBezier(0.76, 0, 0.24, 1)',
        });
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
      <nav
        ref={scope}
        className="text-menu fixed left-0 top-0 z-50 flex h-[40px] w-full flex-col items-stretch justify-center bg-[#F4F4F4] laptop:h-[74px]"
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
            <MainMenu onClick={() => setMobileMenuOpen(false)} />
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
              onClick={() => setMobileMenuOpen(false)}
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
      </nav>
      <div
        className={twMerge(
          'fixed left-0 top-[40px] z-[4000] grid w-full bg-[#F4F4F4] transition-all laptop:hidden',
          mobileMenuOpen ? 'grid grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-[10px] mb-[6px] mt-[6px] grid grid-cols-4 items-start gap-[10px]">
            <div className="col-span-2 col-start-1 flex flex-col">
              <MainMenu onClick={() => setMobileMenuOpen(false)} />
            </div>
            <div className="col-span-2 col-start-3 flex flex-col gap-[6px]">
              <Suspense>
                <LocaleSwitcher />
              </Suspense>
              <a
                href="https://www.instagram.com/ev_ceramiques"
                target="_blank"
                className="targeting-action"
                onClick={() => setMobileMenuOpen(false)}
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
