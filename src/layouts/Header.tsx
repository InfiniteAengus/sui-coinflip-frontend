import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { devnetConnection, JsonRpcProvider } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';

import DropdownIcon from '@/assets/icons/dropdown.svg';

import Menu from '@/components/Menu';
import { getRecent, getLeaderboard } from '@/utils/api';
import { PlayResult, LeaderboardProps } from '@/utils/types';
import LeaderboardMenu from '@/components/LeaderboardMenu';
import SoundButton from '@/components/Button/SoundButton';
import { mode } from '@/config';

const Header = () => {
  const router = useRouter();
  const [balance, setBalance] = useState<string>('');
  const [recentVisible, setRecentVisible] = useState<boolean>(false);
  const [muted, setMuted] = useState(false);
  const [recentData, setRecentData] = useState<PlayResult[]>([]);
  const [leaderboardVisible, setLeaderboardVisible] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardProps[]>([]);
  const wallet = useWallet();

  useEffect(() => {
    refreshBalance();

    getRecentActivity();
    getLeaderboardData();

    setInterval(() => {
      getRecentActivity();
      getLeaderboardData();
    }, 10000);
  }, []);

  const getRecentActivity = async () => {
    const data = await getRecent();
    setRecentData(data);
  };

  const getLeaderboardData = async () => {
    const data = await getLeaderboard();
    setLeaderboardData(data);
  };

  const refreshBalance = async (): Promise<void> => {
    setTimeout(() => {
      refreshBalance();
    }, 3000);

    if (!wallet.address) return;

    const provider = new JsonRpcProvider(mode == "dev" ? devnetConnection : undefined);
    // const provider = new JsonRpcProvider();
    const providerBalance = await provider.getBalance({
      owner: wallet.address || '',
    });
    const accountBalance = Math.round(+providerBalance.totalBalance / 1e8) / 10;

    setBalance(accountBalance.toString());
  };

  const disconnect = (): void => {
    wallet.disconnect();
    router.push('/');
  };

  return (
    <header style={{ zoom: '0.7' }}>
      <div className='container py-10'>
        <div className='flex justify-between'>
          <div className='flex h-fit space-x-6'>
            <SoundButton />
            <div className='flex h-14 w-24 items-center justify-center rounded-md border-[3px] border-black bg-primary text-xl font-semibold text-black'>
              BETA
            </div>
          </div>
          <div className='flex space-x-5'>
            <div
              className='relative hidden h-fit cursor-pointer items-center space-x-1 rounded-md bg-white px-4 py-3 sm:flex'
              onClick={() =>
                setRecentVisible((prev) => {
                  setLeaderboardVisible(false);
                  return !prev;
                })
              }
            >
              <span className='text-[22px]'>RECENT</span>
              <DropdownIcon width={22} heigth={14} />

              <Menu open={recentVisible} data={recentData} />
            </div>
            <div
              className='relative hidden h-fit cursor-pointer items-center space-x-1 rounded-md bg-white px-4 py-3 sm:flex'
              onClick={() =>
                setLeaderboardVisible((prev) => {
                  setRecentVisible(false);
                  return !prev;
                })
              }
            >
              <span className='text-[22px]'>LEADERBOARD</span>
              <DropdownIcon width={22} heigth={14} />

              <LeaderboardMenu open={leaderboardVisible} data={leaderboardData} />
            </div>
            <div className='-mt-2.5 flex cursor-pointer flex-col items-center space-y-1.5'>
              <img src='/images/small-icon.png' width={80} onClick={disconnect} />
              <span className='text-[22px]'>{`${balance ?? '100'} sui`}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
