import { NextApiResponse, NextApiRequest } from 'next';
import { addPlayData } from '../../controllers/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.body?.digest) console.log('Invalid digest');
  addPlayData(req?.body?.digest);
  return res.status(200).json('ok');
}
