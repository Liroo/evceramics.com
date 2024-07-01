import { ReadonlyURLSearchParams } from 'next/navigation';
import { Product } from './shopify/types';

export const getProductMetafieldByIdentifier = (product: Product, identifier: string) => {
  const namespace = identifier.split('.')[0];
  const key = identifier.split('.')[1];

  return product.metafields.find(
    (metafield) => metafield && metafield.namespace === namespace && metafield.key === key,
  );
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
  locale?: string,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  console.log(`${locale ? `/${locale}` : ''}${pathname}${queryString}`);

  return `${locale ? `/${locale}` : ''}${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_STOREFRONT_ACCESS_TOKEN'];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        '\n',
      )}\n`,
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes('[') ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes(']')
  ) {
    throw new Error(
      'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.',
    );
  }
};
