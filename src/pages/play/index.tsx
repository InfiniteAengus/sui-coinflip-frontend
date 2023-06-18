import { useWallet } from '@suiet/wallet-kit';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Init from 'src/components/pages/play/Init';
import Deposit from 'src/components/pages/play/Deposit';
import Flipping from 'src/components/pages/play/Flipping';
import Won from 'src/components/pages/play/Won';
import Lost from 'src/components/pages/play/Lost';

import { winSfx, loseSfx, flippingSfx } from 'src/utils/sound';
import { PlayResult } from 'src/utils/types';
import { useGame } from 'src/hooks/useGame';

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
  const [amount, setAmount] = useState<number>(0);
  const [playResult, setPlayResult] = useState<PlayResult>(mockPlayResult);
  const { gameResult, currentGameId, betAmount, choice, isLoading, handlePlayGame, handleEndGame } =
    useGame();

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
  }, [status, playResult, gameResult]);

  // const handlePlayGame = async (guess: string) => {
  //   const txb: any = new TransactionBlock();
  //   const ser = bytesToHex(randomBytes(16));
  //   const coins = txb.splitCoins(txb.gas, [txb.pure(betAmount * 1000000000)]);

  //   txb.moveCall({
  //     target: `${PACKAGE_ID}::coin_flip::play`,
  //     arguments: [
  //       txb.pure(guess === 'head' ? 1 : 0),
  //       txb.pure(ser),
  //       coins[0] as any,
  //       txb.pure(betAmount * 1000000000),
  //       txb.pure(HOUSE_DATA_ID),
  //     ],
  //   });

  //   try {
  //     let tx = await wallet.signAndExecuteTransactionBlock({
  //       transactionBlock: txb,
  //       options: {
  //         showEffects: true,
  //         showInput: true,
  //         showEvents: true,
  //         showObjectChanges: true,
  //         showBalanceChanges: true,
  //       },
  //     });

  //     setStatus('deposit');

  //     let isRequestInProgress = false;

  //     const timerId = setInterval(async () => {
  //       if (isRequestInProgress) {
  //         return;
  //       }

  //       isRequestInProgress = true;

  //       try {
  //         let playResult: PlayResult = await getPlayResultFromTx(tx);
  //         if (playResult.address) {
  //           axios.post('/api/add_digest', {
  //             playResult: { ...playResult, transactionId: tx.digest },
  //           });
  //           setPlayResult(playResult);
  //           clearInterval(timerId);
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       } finally {
  //         isRequestInProgress = false;
  //       }
  //     }, 1000);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleTryAgain = (): void => {
    setStatus('init');
    setGuess('');
    setPlayResult(mockPlayResult);
    setAmount(0);
  };

  return (
    <div className='container pb-20'>
      {status === 'init' && (
        <Init
          guess={guess}
          setGuess={setGuess}
          betAmount={amount}
          setBetAmount={setAmount}
          play={handlePlayGame}
        />
      )}
      {status === 'deposit' && <Deposit guess={guess} betAmount={amount} />}
      {status === 'flipping' && <Flipping guess={guess} betAmount={amount} />}
      {gameResult === 'win' && <Won betAmount={betAmount * 2} callback={handleTryAgain} />}
      {gameResult === 'lost' && <Lost betAmount={betAmount} callback={handleTryAgain} />}
    </div>
  );
};

export default Play;
