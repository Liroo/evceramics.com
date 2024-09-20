import { TAGS } from 'lib/constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { revalidateTag } from 'next/cache';

export async function revalidate(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = (req.headers['x-shopify-topic'] as string) || 'unknown';
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  const data = await req.body;

  const hmacHeader = req.headers['X-Shopify-Hmac-Sha256'];
  const digest = require('crypto')
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SIGNATURE as string)
    .update(data)
    .digest('base64');

  if (hmacHeader !== digest) {
    console.error('Invalid revalidation secret.');
    return res.status(200).json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return res.status(200).json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return res.status(200).json({ status: 200, revalidated: true, now: Date.now() });
}
