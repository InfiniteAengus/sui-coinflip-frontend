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

  const handleTryAgain = (): void => {
    setStatus('init');
    setGuess('');
    setPlayResult(mockPlayResult);
    setAmount(0);
    handleEndGame();
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
