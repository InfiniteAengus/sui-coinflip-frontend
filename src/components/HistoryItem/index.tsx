import React, { useId } from 'react';

import { cx, getTimeHistoryString, shortenAddress } from 'src/utils/helper';

interface HistoryItemProps {
	address: string;
	betAmount: number;
	timestamp: string;
	won: boolean;
	key: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
	address,
	betAmount,
	timestamp,
	won,
	key,
}) => {
	const id = useId();
	return (
		<div
			className={cx(
				'relative flex w-full items-center gap-4 rounded-xl border-4 bg-opacity-50 px-6 py-3 pr-[50px]',
				won ? 'border-[#44811b] bg-[#44811b]' : 'border-[#c75151] bg-[#c75151]'
			)}
			key={`${id}-${key}`}
		>
			<div className='flex gap-1 text-sm font-light md:text-base'>
				{`${shortenAddress(address)} flipped ${betAmount} sui and `}
				{`${won ? 'claimed glory' : 'got rugged'}`}
			</div>
			<span className='absolute bottom-1 right-3 text-sm'>
				{getTimeHistoryString(new Date(timestamp).getTime())}
			</span>
		</div>
	);
};

export default HistoryItem;
