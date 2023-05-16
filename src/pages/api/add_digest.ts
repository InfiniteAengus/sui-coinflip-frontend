import { NextApiResponse, NextApiRequest } from 'next';
import { addPlayData } from '../../controllers/data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req?.body?.playResult) {
    console.log('Invalid params');
    return;
  }
  addPlayData(req?.body?.playResult);
  return res.status(200).json('ok');
}
