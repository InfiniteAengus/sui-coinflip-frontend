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

const statusList = ['init', 'deposit', 'flipping', 'won', 'lost'];

const Play = () => {
  const [width, height] = useWindowSize();
  const [status, setStatus] = useState<string>('init');
  const [guess, setGuess] = useState<string>('');
  const [betAmount, setBetAmount] = useState<number>(0);
  const [previousBalance, setPreviousBalance] = useState<string>('0');
  const wallet = useWallet();

  const nextStatus = () => {
    setStatus(statusList[(statusList.indexOf(status) + 1) % statusList.length] ?? 'init');
  };

  useEffect(() => {
    const getBalance = async () => {
      const provider = new JsonRpcProvider(devnetConnection);
      return (
        await provider.getBalance({
          owner: wallet.address || '',
        })
      ).totalBalance;
    };

    (async () => {
      if (status == 'deposit') {
        setTimeout(() => {
          setStatus('flipping');
        }, 1000);
      }
      if (status == 'flipping') {
        await new Promise((r) => setTimeout(r, 1000));
        let balance = await getBalance();
        if (Number(balance) < Number(previousBalance)) {
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
    const packageObjectId = '0xcd43c69d5ad829f979a89e9394c5831445e2090bda3a9374ad80361f3576ab4a';
    const houseDataId = '0xe252026aa62a5e91aeb769dad9266a9cdc53288594f774d00a89cd451a6ad170';

    txb.moveCall({
      target: `${packageObjectId}::coin_flip::play`,
      arguments: [
        txb.pure(guess === 'head' ? 1 : 0),
        txb.pure(ser),
        coins[0] as any,
        txb.pure(betAmount * 1000000000),
        txb.pure(houseDataId),
      ],
    });

    txb.setGasBudget(50000000);

    const getBalance = async () => {
      return (
        await provider.getBalance({
          owner: wallet.address || '',
        })
      ).totalBalance;
    };

    try {
      let prvBalance = await getBalance();

      setPreviousBalance(prvBalance);

      let result = await wallet.signAndExecuteTransactionBlock({ transactionBlock: txb });

      nextStatus();

      setTimeout(() => {
        axios.post('/api/add_digest', {
          digest: (result as any).digest,
        });
      }, 2000);
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
        {status === 'won' && <Won betAmount={betAmount} tryAgain={handleTryAgain} />}
        {status === 'lost' && <Lost betAmount={betAmount} tryAgain={handleTryAgain} />}
      </div>
    </Layout>
  );
};

export default Play;
