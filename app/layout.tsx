import { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

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

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
