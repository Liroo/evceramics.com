import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-[#F4F4F4] antialiased">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <body className="relative h-full font-sans text-mud antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
