import { useWalletKit } from '@mysten/wallet-kit';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import Init from 'src/components/pages/play/Init';
import Deposit from 'src/components/pages/play/Deposit';
import Flipping from 'src/components/pages/play/Flipping';
import Won from 'src/components/pages/play/Won';
import Lost from 'src/components/pages/play/Lost';

import { winSfx, loseSfx, flippingSfx } from 'src/utils/sound';
import { useGame } from 'src/hooks/useGame';

const Play = () => {
  const wallet = useWalletKit();

  const [status, setStatus] = useState<string>('init');
  const [guess, setGuess] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const { gameResult, betAmount, isLoading, handlePlayGame, handleEndGame } = useGame();

  useEffect(() => {
    const setWinningStatus = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      setStatus(gameResult!);
      (gameResult === 'win' ? winSfx : loseSfx)();
      toast[gameResult === 'win' ? 'success' : 'error'](
        `You ${gameResult === 'win' ? 'won' : 'lost'} :)`,
        {
          position: 'top-right',
        },
      );
    };

    if (status === 'init' && isLoading) {
      setStatus('deposit');
    }

    if (status == 'deposit') {
      setTimeout(() => {
        setStatus('flipping');
        flippingSfx();
      }, 2000);
    }

    if (status === 'flipping' && gameResult) {
      setWinningStatus();
    }
  }, [status, gameResult, isLoading]);

  const handleTryAgain = (): void => {
    setStatus('init');
    setGuess('');
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
      {status === 'win' && (
        <Won betAmount={(betAmount * 2) / 1000000000} callback={handleTryAgain} />
      )}
      {status === 'lost' && <Lost betAmount={betAmount / 1000000000} callback={handleTryAgain} />}
    </div>
  );
};

export default Play;
