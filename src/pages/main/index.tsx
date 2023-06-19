import { useWallet } from '@suiet/wallet-kit';
import { useEffect, useState } from 'react';

import ConnectButton from 'src/components/Button/ConnectButton';
import HistoryItem from 'src/components/HistoryItem';
import { getRecentHistoryData } from 'src/utils/getRecentHistoryData';
import { PlayResult } from 'src/utils/types';

const Main = () => {
  const wallet = useWallet();
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const recentData = await getRecentHistoryData();
      console.log(recentData);
    })();
  }, []);

  useEffect(() => {
    if (!wallet.connected) return;
    window.location.href = '/play';
  }, [wallet.connected]);

  return (
    <div className='container py-20'>
      <div className='flex flex-col items-center space-y-20'>
        <div className='flex flex-col items-center -space-y-10'>
          <div className='relative'>
            <img src='/images/logo.png' alt='logo' />
            <img
              src='/images/click_here.png'
              alt='click'
              className='absolute -left-[calc(25%-80px)] bottom-0'
            />
          </div>
          <ConnectButton />
        </div>
        <div className='flex flex-col items-center'>
          <h4 className='rounded-full border-[4px] border-[#f1cc54] bg-[#2e4d7d] px-10 py-1 text-4xl'>
            RECENT PLAYERS
          </h4>
          <div className='mt-5 flex flex-col gap-4'>
            {recent.map((item: PlayResult, id: number) => (
              <HistoryItem
                address={item.address}
                betAmount={item.betAmount}
                timestamp={item.timestamp}
                won={item.won}
                key={`${id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
