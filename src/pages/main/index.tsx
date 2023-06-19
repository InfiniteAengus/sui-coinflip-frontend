import { useWalletKit } from '@mysten/wallet-kit';
import { useEffect, useState } from 'react';

import ConnectButton from 'src/components/Button/ConnectButton';
import HistoryItem from 'src/components/HistoryItem';
import { PlayResult } from 'src/@types/game';
import { useAppSelector } from 'src/hooks/redux';

const Main = () => {
  const { isConnected } = useWalletKit();
  const recent = useAppSelector((state) => state.history);

  useEffect(() => {
    if (!isConnected) return;
    window.location.href = '/play';
  }, [isConnected]);

  return (
    <div className='container py-5'>
      <div className='flex flex-col items-center space-y-20'>
        <div className='flex flex-col items-center -space-y-10'>
          <div className='relative'>
            <img src='/images/logo.png' alt='logo' className='w-[700px]' />
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
            {recent.map((item: PlayResult) => (
              <>
                <HistoryItem
                  address={item.player}
                  betAmount={item.balance / 1000000000}
                  timestamp={item.dateEnded}
                  won={item.result}
                  key={item.id}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
