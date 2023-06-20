import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';

import RecentMenu from 'src/components/Recent/Menu';
import LeaderboardMenu from 'src/components/Leaderboard/Menu';
import SoundButton from 'src/components/Button/SoundButton';
import { mode } from 'src/config';
import { useAppSelector } from 'src/hooks/redux';
import Recent from 'src/components/Recent';
import Leaderboard from 'src/components/Leaderboard';

const Header = () => {
  const navigate = useNavigate();

  const { currentAccount, disconnect: walletDisconnect } = useWalletKit();
  const [balance, setBalance] = useState<string>('');
  const [recentVisible, setRecentVisible] = useState<boolean>(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<[]>([]);

  useEffect(() => {
    const timerId = setInterval(() => {
      refreshBalance();
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, [currentAccount]);

  const refreshBalance = async (): Promise<void> => {
    if (!currentAccount?.address) return;

    // const provider = new JsonRpcProvider(mode == 'dev' ? devnetConnection : undefined);
    const provider = new JsonRpcProvider(
      new Connection({
        fullnode: `https://fullnode.${mode == 'test' ? 'testnet' : 'mainnet'}.sui.io:443/`,
      }),
    );
    const providerBalance = await provider.getBalance({
      owner: currentAccount?.address || '',
    });
    const accountBalance = Math.round(+providerBalance.totalBalance / 1e8) / 10;

    setBalance(accountBalance.toString());
  };

  const disconnect = async () => {
    await walletDisconnect();
    navigate('/');
  };

  return (
    <header style={{ zoom: '0.61' }} className='relative z-[2]'>
      <div className='px-10 py-5'>
        <div className='flex justify-between'>
          <div className='flex h-fit space-x-6'>
            <SoundButton />
          </div>
          <div className='flex space-x-8'>
            <Recent />
            <Leaderboard />
            <div className='-mt-2.5 flex cursor-pointer flex-col items-center space-y-1.5'>
              <img src='/images/sui.png' width={60} onClick={disconnect} />
              <span className='text-[22px]'>{`${balance ?? '100'} sui`}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
