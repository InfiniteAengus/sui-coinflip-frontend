import { devnetConnection, JsonRpcProvider } from '@mysten/sui.js';
import console from 'console';

// controller
interface PlayData {
  timestamp?: number;
  won?: boolean;
  address?: string;
  betAmount?: number;
};

let playData: PlayData[] = [];
let earning: any = {};
const RECENT_LIMIT = 10;

export const getRecent = () => {
  return playData;
};

export const addPlayData = async (digestId: string) => {
  if (!digestId) return;
  const provider = new JsonRpcProvider(devnetConnection);
  const txn = await provider.getTransactionBlock({
    digest: digestId,
    // only fetch the effects field
    options: {
      showEffects: true,
      showInput: false,
      showEvents: false,
      showObjectChanges: false,
      showBalanceChanges: false
    }
  });
  let newObjects = txn.effects?.created || [];
  let newData: PlayData = {};
  for (let object of newObjects) {
    let objectContents = await provider.getObject({
      id: object.reference.objectId,
      options: { showContent: true },
    });
    if (!objectContents.error) {
      let content = objectContents.data?.content;
      if (content.type.includes("Outcome")) {
        newData.won = content.fields.player_won;
      }
      if (content.type.includes("Game")) {
        newData.betAmount = content.fields.stake_amount;
        newData.address = content.fields.player;
        newData.timestamp = Date.now();
      }
    }
  }
  console.log(newData);
  playData.push(newData);
  if (!earning[newData?.address]) {
    earning[newData.address] = 0;
  }
  earning[newData.address] + newData.betAmount;
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