import { useShopifyCookies } from '@shopify/hydrogen-react';
import GridPreview from 'components/grid/preview';
import LayoutProviderShopify from 'components/layout/provider/shopify';
import { NextPage } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'styles/globals.css';
import 'tailwindcss/tailwind.css';

import Cursor from 'components/cursor';
import LayoutNavbar from 'components/layout/navbar';
import { AnimatePresence } from 'framer-motion';
import { DefaultSeo } from 'next-seo';
import localFont from 'next/font/local';

const brutGrotesque = localFont({
  src: [
    {
      path: '../fonts/BrutGrotesque-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/BrutGrotesque-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/BrutGrotesque-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BrutGrotesque-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-brut',
});

const romie = localFont({
  src: '../fonts/Romie-Regular-Italic.woff2',
  variable: '--font-romie',
});

export default function MyApp({ Component, pageProps }: { Component: NextPage; pageProps: any }) {
  const router = useRouter();

  useEffect(() => {
    const onUnload = () => {
      window.sessionStorage.clear();
    };
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, []);

  useShopifyCookies();

  // Get a key without search
  const pageKey = (router.asPath || '').split('?')[0];

  return (
    <div className={`${brutGrotesque.variable} ${romie.variable} contents font-sans`}>
      <NextIntlClientProvider
        timeZone="Europe/Paris"
        locale={router.locale}
        messages={pageProps.messages}
      >
        <LayoutProviderShopify>
          <LayoutNavbar />

          <main className="h-full overflow-x-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <DefaultSeo
                title="Ev Ceramics"
                description="EV Ceramics is a ceramic studio run by Emilie Vizcano. All the pieces she makes are handmade, one by one, using the modelling technique."
                openGraph={{
                  type: 'website',
                  url: 'https://www.evceramics.com/',
                  siteName: 'Ev Ceramics',
                  images: [
                    {
                      url: 'https://www.evceramics.com/images/infos/emilie.jpg',
                    },
                  ],
                }}
                twitter={{
                  cardType: 'summary_large_image',
                  handle: '@sen_vz',
                }}
              />
              <Component key={pageKey} {...pageProps} />
            </AnimatePresence>
          </main>
          <GridPreview />
        </LayoutProviderShopify>
      </NextIntlClientProvider>
      <Cursor />
    </div>
  );
}
