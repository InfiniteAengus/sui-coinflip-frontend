import { TransactionBlock } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { bytesToHex, randomBytes } from '@noble/hashes/utils';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { HOUSE_DATA_ID, PACKAGE_ID } from 'src/config';

import Init from 'src/components/pages/play/Init';
import Deposit from 'src/components/pages/play/Deposit';
import Flipping from 'src/components/pages/play/Flipping';
import Won from 'src/components/pages/play/Won';
import Lost from 'src/components/pages/play/Lost';

import { winSfx, loseSfx, flippingSfx } from 'src/utils/sound';
import { PlayResult } from 'src/utils/types';
import { getPlayResultFromTx } from 'src/utils/web3';

const mockPlayResult = {
  timestamp: 0,
  won: false,
  betAmount: 0,
  address: '',
  transactionId: '',
};

const Play = () => {
  const wallet = useWallet();

  const [status, setStatus] = useState<string>('init');
  const [guess, setGuess] = useState<string>('');
  const [betAmount, setBetAmount] = useState<number>(0);
  const [playResult, setPlayResult] = useState<PlayResult>(mockPlayResult);

  useEffect(() => {
    const setWinningStatus = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      setStatus(playResult.won ? 'won' : 'lost');
      (playResult.won ? winSfx : loseSfx)();
      toast[playResult.won ? 'success' : 'error'](`You ${playResult.won ? 'won' : 'lost'} :)`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      if (playResult.won) {
        localStorage.setItem('_gameInfo', JSON.stringify(playResult));
      }
    };

    if (status == 'deposit') {
      setTimeout(() => {
        setStatus('flipping');
        flippingSfx();
      }, 2000);
    }

    if (status === 'flipping' && playResult.timestamp) {
      setWinningStatus();
    }
  }, [status, playResult]);

  useEffect(() => {
    const gameInfo = JSON.parse(localStorage.getItem('_gameInfo') || '{}');
    if (Object.keys(gameInfo).length) {
      setStatus('won');
      setPlayResult(gameInfo);
    }
  }, []);

  const handlePlayGame = async (guess: string) => {
    const txb: any = new TransactionBlock();
    const ser = bytesToHex(randomBytes(16));
    const coins = txb.splitCoins(txb.gas, [txb.pure(betAmount * 1000000000)]);

    txb.moveCall({
      target: `${PACKAGE_ID}::coin_flip::play`,
      arguments: [
        txb.pure(guess === 'head' ? 1 : 0),
        txb.pure(ser),
        coins[0] as any,
        txb.pure(betAmount * 1000000000),
        txb.pure(HOUSE_DATA_ID),
      ],
    });

    try {
      let tx = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txb,
        options: {
          showEffects: true,
          showInput: true,
          showEvents: true,
          showObjectChanges: true,
          showBalanceChanges: true,
        },
      });

      setStatus('deposit');

      let isRequestInProgress = false;

      const timerId = setInterval(async () => {
        if (isRequestInProgress) {
          return;
        }

        isRequestInProgress = true;

        try {
          let playResult: PlayResult = await getPlayResultFromTx(tx);
          if (playResult.address) {
            axios.post('/api/add_digest', {
              playResult: { ...playResult, transactionId: tx.digest },
            });
            setPlayResult(playResult);
            clearInterval(timerId);
          }
        } catch (e) {
          console.log(e);
        } finally {
          isRequestInProgress = false;
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTryAgain = (): void => {
    setStatus('init');
    setGuess('');
    setPlayResult(mockPlayResult);
    setBetAmount(0);
  };

  const handleClaimWinning = async (): Promise<void> => {
    try {
      const gameStatus = JSON.parse(localStorage.getItem('_gameInfo') || '{}');

      if (Object.keys(gameStatus).length) {
        const txb: any = new TransactionBlock();
        txb.moveCall({
          target: `${PACKAGE_ID}::coin_flip::claim`,
          arguments: [txb.pure(gameStatus.gameId)],
        });
        await wallet.signAndExecuteTransactionBlock({ transactionBlock: txb });
        localStorage.removeItem('_gameInfo');
        toast.info(`Claimed ${gameStatus.betAmount * 2} SUI`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        handleTryAgain();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='container pb-20'>
      {status === 'init' && (
        <Init
          guess={guess}
          setGuess={setGuess}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          play={handlePlayGame}
        />
      )}
      {status === 'deposit' && <Deposit guess={guess} betAmount={betAmount} />}
      {status === 'flipping' && <Flipping guess={guess} betAmount={betAmount} />}
      {status === 'won' && (
        <Won betAmount={playResult.betAmount * 2} claimWinning={handleClaimWinning} />
      )}
      {status === 'lost' && <Lost betAmount={playResult.betAmount} tryAgain={handleTryAgain} />}
    </div>
  );
};

export default Play;
