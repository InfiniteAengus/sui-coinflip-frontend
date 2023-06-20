import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useWalletKit } from '@mysten/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js';
import { bytesToHex, randomBytes } from '@noble/hashes/utils';

import { CoinSide, GameResult } from 'src/@types/game';

import { PACKAGE_ID, HOUSE_DATA_ID, NFT_ADDRESS } from 'src/config';
import API from 'src/api';
import useOwnedObject from './useOwnedObject';

export const useGame = () => {
  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();
  const { ownedObject } = useOwnedObject(currentAccount?.address!, NFT_ADDRESS);
  const [isLoading, setIsLoading] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [choice, setChoice] = useState<CoinSide | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);

  const handlePlayGame = async (choice: CoinSide, balance: number) => {
    setChoice(choice);
    setBetAmount(balance);

    await handleNewGame(choice, balance)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error('Something went wrong.');
      });
  };

  const handleNewGame = async (choice: CoinSide, balance: number) => {
    const userRandomness = randomBytes(16);
    const userRandomnessHexString = bytesToHex(userRandomness);

    const tx = new TransactionBlock();
    let coin = tx.splitCoins(tx.gas, [tx.pure(Number(balance))]);

    if (!ownedObject) {
      tx.moveCall({
        target: `${PACKAGE_ID}::coin_flip::start_game`,
        arguments: [
          tx.pure(choice === 'heads' ? '1' : '0'),
          tx.pure(Array.from(userRandomness)),
          tx.pure(Number(balance)),
          coin,
          tx.object(HOUSE_DATA_ID),
        ],
      });
    } else {
      tx.moveCall({
        target: `${PACKAGE_ID}::coin_flip::start_game_with_capy`,
        arguments: [
          tx.pure(ownedObject),
          tx.pure(choice === 'heads' ? '1' : '0'),
          tx.pure(Array.from(userRandomness)),
          tx.pure(Number(balance)),
          coin,
          tx.object(HOUSE_DATA_ID),
        ],
      });
    }

    return signAndExecuteTransactionBlock({
      transactionBlock: tx as any,
      requestType: 'WaitForLocalExecution',
      options: {
        showEffects: true,
        showEvents: true,
      },
    })
      .then((resp) => {
        setIsLoading(true);
        if (resp.effects?.status.status === 'success') {
          const createdObjects = resp.effects?.created;
          const createdGame = createdObjects?.[0];
          const gameObjectId = createdGame?.reference.objectId;
          const txnDigest = resp.digest;
          if (!!gameObjectId) {
            setCurrentGameId(gameObjectId);
            return playGame(
              gameObjectId,
              userRandomnessHexString,
              txnDigest,
              currentAccount?.address!,
              +balance,
            );
          }
          setCurrentGameId(null);
        } else {
          setCurrentGameId(null);
          console.log('game creation failed');
          toast.error('Sorry, game could not be played.');
        }
      })
      .catch((err) => {
        setCurrentGameId(null);
        console.log('game creation failed');
        console.log(err);
        toast.error('Something went wrong, game could not be started.');
      });
  };

  const playGame = async (
    gameObjectId: string,
    userRandomnessHexString: string,
    txnDigest: string,
    player: string,
    balance: number,
  ) => {
    return API.playGameRequest(gameObjectId, txnDigest, userRandomnessHexString, player, balance)
      .then((resp) => {
        const { playerWon } = resp.data;
        setGameResult(playerWon ? 'win' : 'lost');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong, game could not be played.');
      });
  };

  const handleEndGame = () => {
    setIsLoading(false);
    setChoice(null);
    setGameResult(null);
  };

  return {
    currentGameId,
    gameResult,
    betAmount,
    choice,
    isLoading,
    handlePlayGame,
    handleEndGame,
  };
};
