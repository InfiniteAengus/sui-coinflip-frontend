import React from 'react';
import { shortenAddress, getTimeHistoryString } from '@/utils/helper';

interface HistoryItemProps {
  address: string;
  betAmount: number;
  time: number;
  win: boolean;
  key: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ address, betAmount, time, win, key }) => {
  return (
    <div className='relative w-full flex items-center gap-9 py-3 pr-[100px] px-4 bg-white rounded-md' key={key}>
      <img src='/images/small-icon.png' className='w-14 h-14' />
      <div className='flex gap-2 text-2xl'>
        <span>{`${shortenAddress(address)} flipped ${betAmount / 10 ** 9} sui and `}</span>
        <span className={`${win ? 'text-[#7DD955]' : 'text-[#E33030]'}`}>{`${
          win ? 'doubled 2 times' : 'got ruggged'
        }`}</span>
      </div>
      <span className='absolute right-5 bottom-1 text-xs'>{getTimeHistoryString(time)}</span>
    </div>
  );
};

export default HistoryItem;
