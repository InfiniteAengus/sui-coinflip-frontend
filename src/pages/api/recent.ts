import { NextApiResponse, NextApiRequest } from 'next';
import { getRecent } from '../../controllers/data';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  console.log('log');
  return res.status(200).json(getRecent());
}
