import Cursor from 'components/cursor';
import GridPreview from 'components/grid/preview';
import LayoutNavbar from 'components/layout/navbar';
import LayoutProviderAnimate from 'components/layout/provider/animate';
import LayoutProviderShopify from 'components/layout/provider/shopify';
import { getMenu } from 'lib/shopify';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';

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

export const metadata = {
  title: 'Ev Ceramics',
  description:
    'EV Ceramics is a ceramic studio run by Emilie Vizcano. All the pieces she makes are handmade, one by one, using the modelling technique.',
  openGraph: {
    url: 'https://www.evceramics.com/',
    siteName: 'Ev Ceramics',
    images: [
      {
        url: 'https://www.evceramics.com/images/infos/emilie.jpg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ev Ceramics',
    creator: '@sen_vz',
    images: ['https://www.evceramics.com/images/infos/emilie.jpg'], // Must be an absolute URL
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const mainMenu = await getMenu('main-menu', locale.toUpperCase());

  return (
    <html lang={locale} className="h-full bg-[#F4F4F4]">
      <body
        className={`${brutGrotesque.variable} ${romie.variable} relative h-full font-sans text-mud antialiased`}
      >
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <LayoutProviderShopify>
              <LayoutNavbar menu={mainMenu} />
              <main className="h-full overflow-x-hidden">
                <LayoutProviderAnimate>{children}</LayoutProviderAnimate>
              </main>
              <GridPreview />
            </LayoutProviderShopify>
          </NextIntlClientProvider>
        </Providers>
        <Cursor />
      </body>
    </html>
  );
}
