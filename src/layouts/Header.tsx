import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { JsonRpcProvider, Connection } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';

import RecentMenu from 'src/components/RecentMenu';
import LeaderboardMenu from 'src/components/LeaderboardMenu';
import SoundButton from 'src/components/Button/SoundButton';
import { mode } from 'src/config';
import { getRecentHistoryData } from 'src/utils/getRecentHistoryData';

const Header = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<string>('');
  const [recentVisible, setRecentVisible] = useState<boolean>(false);
  const [recentData, setRecentData] = useState<[]>([]);
  const [leaderboardVisible, setLeaderboardVisible] = useState<boolean>(false);
  const [leaderboardData, setLeaderboardData] = useState<[]>([]);
  const wallet = useWallet();

  useEffect(() => {
    const timerId = setInterval(async () => {
      setRecentData(await getRecentHistoryData());
    }, 5000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      refreshBalance();
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, [wallet]);

  const refreshBalance = async (): Promise<void> => {
    if (!wallet.address) return;

    // const provider = new JsonRpcProvider(mode == 'dev' ? devnetConnection : undefined);
    const provider = new JsonRpcProvider(
      new Connection({
        fullnode: `https://fullnode.${mode == 'test' ? 'testnet' : 'mainnet'}.sui.io:443/`,
      }),
    );
    const providerBalance = await provider.getBalance({
      owner: wallet.address || '',
    });
    const accountBalance = Math.round(+providerBalance.totalBalance / 1e8) / 10;

    setBalance(accountBalance.toString());
  };

  const disconnect = (): void => {
    wallet.disconnect();
    navigate('/');
  };

  return (
    <header style={{ zoom: '0.7' }} className='relative z-[1]'>
      <div className='px-10 py-5'>
        <div className='flex justify-between'>
          <div className='flex h-fit space-x-6'>
            <SoundButton />
          </div>
          <div className='flex space-x-8'>
            <div
              className='relative hidden h-fit cursor-pointer items-center space-x-5 rounded-full border-[6px] border-[#6397f7] bg-[#2e477d] px-4 py-1 sm:flex'
              onClick={() =>
                setRecentVisible((prev) => {
                  setLeaderboardVisible(false);
                  return !prev;
                })
              }
            >
              <span className='text-[22px]'>RECENT GAMES</span>
              <img src='/images/dropdown.png' className='h-[14px] w-[22px] brightness-0 invert' />
              <RecentMenu open={recentVisible} data={recentData} />
            </div>
            <div
              className='relative hidden h-fit cursor-pointer items-center space-x-5 rounded-full border-[6px] border-[#c75151] bg-[#753131] px-4 py-1 sm:flex'
              onClick={() =>
                setLeaderboardVisible((prev) => {
                  setRecentVisible(false);
                  return !prev;
                })
              }
            >
              <span className='text-[22px]'>LEADERBOARD</span>
              <img src='/images/dropdown.png' className='h-[14px] w-[22px] brightness-0 invert' />
              <LeaderboardMenu open={leaderboardVisible} data={leaderboardData} />
            </div>
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
