import React from 'react';
import { shortenAddress, getTimeHistoryString } from '@/utils/helper';

interface HistoryItemProps {
  address: string;
  betAmount: number;
  timestamp: number;
  won: boolean;
  key: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ address, betAmount, timestamp, won, key }) => {
  return (
    <div
      className='relative flex w-full items-center gap-9 rounded-md bg-white px-4 py-3 pr-[100px]'
      key={key}
    >
      <img src='/images/small-icon.png' className='h-14 w-14' />
      <div className='flex gap-2 text-2xl'>
        <span>{`${shortenAddress(address)} flipped ${betAmount / 10 ** 9} sui and `}</span>
        <span className={`${won ? 'text-[#7DD955]' : 'text-[#E33030]'}`}>{`${
          won ? 'doubled 2 times' : 'got ruggged'
        }`}</span>
      </div>
      <span className='absolute bottom-1 right-5 text-xs'>{getTimeHistoryString(timestamp)}</span>
    </div>
  );
};

export default HistoryItem;
