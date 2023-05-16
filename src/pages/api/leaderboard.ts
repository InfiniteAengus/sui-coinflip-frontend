import { NextApiResponse, NextApiRequest } from 'next';
import { getLeaderboard } from '../../controllers/data';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(getLeaderboard());
}
