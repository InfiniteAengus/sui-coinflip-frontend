import { useWallet } from '@suiet/wallet-kit';
import { useEffect, useState } from 'react';
import { getRecent } from '@/utils/api';

import HistoryItem from '@/components/HistoryItem';
import ConnectButton from '@/components/Button/ConnectButton';

const Main = () => {
  const wallet = useWallet();
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    if (!wallet.connected) return;
    window.location.href = '/play';
  }, [wallet.connected]);

  useEffect(() => {
    (async () => {
      setRecent(await getRecent());
    })();
  }, []);

  return (
    <div className='container py-20' style={{ zoom: '0.5' }}>
      <div className='flex flex-col items-center space-y-20'>
        <h3 className='text-[60px]'>sui or nothing?</h3>
        <div className='flex flex-col items-center space-y-12'>
          <img src='/images/smile-coin.png' width={360} className='mt-10 w-[300px]' />
          <ConnectButton />
        </div>
        <div className='flex flex-col items-center'>
          <h4 className='text-4xl'>RECENT PLAYERS</h4>
          <div className='mt-5 flex flex-col gap-4'>
            {recent.map((item: any, id: number) => (
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
