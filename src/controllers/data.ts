import { devnetConnection, JsonRpcProvider } from '@mysten/sui.js';
import console from 'console';
import { PlayResult } from '@/utils/types';


// controller
let playData: PlayResult[] = [];
let earning: any = {};
const RECENT_LIMIT = 10;

export const getRecent = () => {
  return playData;
};

export const addPlayData = async (playResult: PlayResult) => {
  console.log(playResult);
  playData.push(playResult);
  if (!earning[playResult?.address]) {
    earning[playResult.address] = 0;
  }
  earning[playResult.address] += playResult.betAmount;
  if (playData.length > RECENT_LIMIT) playData = playData.splice(0, 1);
}

export const getLeaderboard = () => {
  return Object.keys(earning).map(addr => {
    return {
      address: addr,
      profit: earning[addr],
    }
  }).sort((a, b) => b.profit - a.profit).slice(0, 10);
}