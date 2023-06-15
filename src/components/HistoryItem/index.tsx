import React, { useId } from 'react';

import DropdownIcon from '@/assets/icons/dropdown.svg';

import { shortenAddress, getTimeHistoryString, cx } from '@/utils/helper';

interface HistoryItemProps {
  address: string;
  betAmount: number;
  timestamp: number;
  won: boolean;
  key: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ address, betAmount, timestamp, won, key }) => {
  const id = useId();
  return (
    <div
      className={cx(
        'relative flex w-full items-center gap-9 rounded-md border-y-8 border-black px-12 py-6 pr-[100px]',
        won ? 'bg-green' : 'bg-red',
      )}
      key={`${id}-${key}`}
    >
      <div className='flex gap-2 text-4xl'>
        {`${shortenAddress(address)} flipped ${betAmount} sui and `}
        {`${won ? 'claimed glory' : 'got ruggged'}`}
      </div>
      <span className='absolute bottom-1 right-4 text-xl'>{getTimeHistoryString(timestamp)}</span>

      <div className='absolute left-0 top-0 h-[20px] w-full border-x-8 border-black' />
      <div className='absolute bottom-0 left-0 h-[20px] w-full border-x-8 border-black' />
      <div className='absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 scale-150'>
        <DropdownIcon />
      </div>
      <div className='absolute -right-10 top-1/2 -translate-y-1/2 rotate-90 scale-150'>
        <DropdownIcon />
      </div>
    </div>
  );
};

export default HistoryItem;
