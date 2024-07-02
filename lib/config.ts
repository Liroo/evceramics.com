import { Pathnames } from 'next-intl/navigation';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export const defaultLocale = 'en' as const;
export const locales = ['en', 'fr'] as const;

export const pathnames = {
  '/': '/',
  '/infos': '/infos',
  '/shop/[handle]': '/shop/[collectionhandle]',
  '/product/[handle]': '/product/[handle]',
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
