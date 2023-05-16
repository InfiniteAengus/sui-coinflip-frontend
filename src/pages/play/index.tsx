import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useWindowSize } from '@react-hook/window-size';
import axios from 'axios';
import { TransactionBlock, devnetConnection, JsonRpcProvider } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { bytesToHex, randomBytes } from '@noble/hashes/utils';

import Layout from '@/layouts';
import Init from '@/components/pages/play/Init';
import Deposit from '@/components/pages/play/Deposit';
import Flipping from '@/components/pages/play/Flipping';
import Won from '@/components/pages/play/Won';
import Lost from '@/components/pages/play/Lost';

import { winSfx, loseSfx, buttonClickSfx } from '@/utils';
import { PlayResult } from '@/utils/types';
import { getPlayResultFromTx } from '@/utils/web3';
import { HOUSE_DATA_ID, PACKAGE_ID } from '@/config';

const statusList = ['init', 'deposit', 'flipping', 'won', 'lost'];
const mockPlayResult = {
  timestamp: 0,
  won: false,
  betAmount: 0,
  address: '',
};

const Play = () => {
  const [width, height] = useWindowSize();
  const [status, setStatus] = useState<string>('init');
  const [guess, setGuess] = useState<string>('');
  const [betAmount, setBetAmount] = useState<number>(0);
  const [playResult, setPlayResult] = useState<PlayResult>(mockPlayResult);
  const [previousBalance, setPreviousBalance] = useState<string>('0');
  const wallet = useWallet();

  const nextStatus = () => {
    setStatus(statusList[(statusList.indexOf(status) + 1) % statusList.length] ?? 'init');
  };

  useEffect(() => {
    (async () => {
      if (status == 'deposit') {
        setTimeout(() => {
          setStatus('flipping');
        }, 2000);
      }
      if (status == 'flipping') {
        await new Promise((r) => setTimeout(r, 2000));
        if (!playResult.won) {
          setStatus('lost');
          loseSfx();
          toast.error('You lost :(', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } else {
          setStatus('won');
          winSfx();
          toast.success('You won :)', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
      }
    })();
  }, [status]);

  const handlePlayGame = async (guess: string) => {
    const provider = new JsonRpcProvider(devnetConnection);
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

    // txb.setGasBudget(50000000);

    try {
      let tx = await wallet.signAndExecuteTransactionBlock({ transactionBlock: txb });
      console.log(tx);

      nextStatus();

      setTimeout(async () => {
        let playResult: PlayResult = await getPlayResultFromTx((tx as any).digest);
        axios.post('/api/add_digest', {
          playResult,
        });
        setPlayResult(playResult);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTryAgain = (): void => {
    buttonClickSfx();
    setStatus('init');
    setGuess('');
    setBetAmount(0);
  };

  const handleClaimWinning = async (): Promise<void> => {
    try {
      const txb: any = new TransactionBlock();
      txb.moveCall({
        target: `${PACKAGE_ID}::coin_flip::claim`,
        arguments: [txb.pure(playResult.gameId)],
      });
      await wallet.signAndExecuteTransactionBlock({ transactionBlock: txb });

      toast.info(`Claimed ${betAmount * 2} SUI`, {
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
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
        {status === 'won' && <Won betAmount={betAmount*2} claimWinning={handleClaimWinning} />}
        {status === 'lost' && <Lost betAmount={betAmount} tryAgain={handleTryAgain} />}
      </div>
    </Layout>
  );
};

export default Play;
