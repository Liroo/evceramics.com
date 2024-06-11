import Intro from 'components/intro';
import { unstable_setRequestLocale } from 'next-intl/server';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
};

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Intro>
        <div className="min-h-full"></div>
      </Intro>
    </>
  );
}
