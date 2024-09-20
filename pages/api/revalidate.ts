import { revalidate } from 'lib/shopify/revalidate';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return revalidate(req, res);
}
