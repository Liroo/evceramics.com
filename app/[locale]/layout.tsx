import ComingSoon from 'components/comingSoon';
import GridPreview from 'components/grid/preview';
import LayoutNavbar from 'components/layout/navbar';
import LayoutProviderAnimate from 'components/layout/provider/animate';
import LayoutProviderShopify from 'components/layout/provider/shopify';
import { getMenu } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import localFont from 'next/font/local';
import { ReactNode, Suspense } from 'react';
import '../globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

const brutGrotesque = localFont({
  src: [
    {
      path: '../../fonts/BrutGrotesque-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../fonts/BrutGrotesque-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../fonts/BrutGrotesque-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/BrutGrotesque-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-brut',
});

const romie = localFont({
  src: '../../fonts/Romie-Regular-Italic.woff2',
  variable: '--font-romie',
});
export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const mainMenu = await getMenu('main-menu', locale.toUpperCase());

  const showComingSoon: boolean = process.env.NEXT_PUBLIC_DEPLOY_ENV === 'production';

  return (
    <html lang={locale} className="h-full bg-[#F4F4F4]">
      <body
        className={`${brutGrotesque.variable} ${romie.variable} relative h-full font-sans text-mud antialiased`}
      >
        {showComingSoon ? (
          <ComingSoon />
        ) : (
          <Suspense>
            <NextIntlClientProvider messages={messages}>
              <LayoutProviderShopify>
                <LayoutNavbar menu={mainMenu} />
                <main className="h-full overflow-x-hidden">
                  <LayoutProviderAnimate>{children}</LayoutProviderAnimate>
                </main>
                <GridPreview />
              </LayoutProviderShopify>
            </NextIntlClientProvider>
          </Suspense>
        )}
      </body>
    </html>
  );
}

const locales = ['en', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
