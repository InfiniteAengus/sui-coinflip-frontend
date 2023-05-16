import { devnetConnection, JsonRpcProvider } from '@mysten/sui.js';
import { PlayResult } from '@/utils/types';

export const getPlayResultFromTx = async (digestId: string) => {
  if (!digestId) {
    console.error("Invalid digestId");
  }

  let result: PlayResult = {
    timestamp: 0,
    won: false,
    address: '',
    betAmount: 0
  };

  const provider = new JsonRpcProvider(devnetConnection);
  const txn = await provider.getTransactionBlock({
    digest: digestId,
    // only fetch the effects field
    options: {
      showEffects: true,
      showInput: false,
      showEvents: false,
      showObjectChanges: false,
      showBalanceChanges: false,
    },
  });
  let newObjects = txn.effects?.created || [];
  for (let object of newObjects) {
    let objectContents = await provider.getObject({
      id: object.reference.objectId,
      options: { showContent: true },
    });
    if (!objectContents.error) {
      let content = objectContents.data?.content;
      if (content?.type.includes('Outcome')) {
        result.won = content.fields?.player_won;
        result.outcomeId = object.reference.objectId;
      }
      if (content?.type.includes('Game')) {
        result.gameId = object.reference.objectId;
        result.betAmount = content.fields.stake_amount;
        result.address = content.fields.player;
        result.timestamp = Date.now();
      }
    }
  }
  return result;
};
