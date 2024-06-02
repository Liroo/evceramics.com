import GridPreview from 'components/gridPreview';
import LayoutNavbar from 'components/layout/navbar';
import { ensureStartsWith } from 'lib/utils';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

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

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${brutGrotesque.variable} h-full font-sans`}>
        <LayoutNavbar />
        <main className="h-full">{children}</main>
        <GridPreview />
      </body>
    </html>
  );
}
