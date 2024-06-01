import Intro from 'components/intro';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
};

export default async function HomePage() {
  return (
    <>
      <Intro>
        <div className="h-full w-full bg-[#ff00ff]"></div>
      </Intro>
    </>
  );
}
