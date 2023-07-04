import { useId } from 'react';

import { mode } from 'src/config';
import { cx, getTimeHistoryString, shortenAddress } from 'src/utils/helper';

interface RecentMenuProps {
	data: any[];
	open: boolean;
	onClose: () => void;
}

const RecentMenu: React.FC<RecentMenuProps> = props => {
	const { data, open, onClose } = props;
	const id = useId();

	if (!open) {
		return <></>;
	}

	return (
		<>
			<div
				className='fixed left-0 top-0 z-[0] h-full w-full'
				onClick={onClose}
			/>
			<ul
				className={cx(
					open ? 'block' : 'hidden',
					'absolute left-1/2 top-[calc(100%+10px)] z-[3] -translate-x-1/2 rounded-xl bg-[#1C1E2d] py-2 shadow-lg'
				)}
			>
				{Array.isArray(data) && data.length > 0 ? (
					data.map((item, key) => (
						<a
							href={`https://suiexplorer.com/txblock/${item.txnDigest}?network=${mode}`}
							target='_blank'
							rel='noreferrer'
							className='relative block w-full flex-col items-center gap-9 rounded-lg bg-[#1C1E2d] px-2 py-3 transition-all hover:bg-[#323f68]'
							key={`${id}-${key}`}
						>
							<div className='flex gap-2 text-base font-thin'>
								<span className='whitespace-nowrap'>
									<span className='text-[#b1c4f8]'>
										{shortenAddress(item.player)}
									</span>{' '}
									flipped
									{` ${item.balance / 1000000000}`} sui and
								</span>
								<span
									className={`${
										item.result ? 'text-[#7DD955]' : 'text-[#E33030]'
									} whitespace-nowrap`}
								>{`${item.result ? 'doubled' : 'got rugged'}`}</span>
							</div>
							<div className='flex w-full'>
								<span className='ml-auto text-sm'>
									{getTimeHistoryString(new Date(item.dateEnded).getTime())}
								</span>
							</div>
						</a>
					))
				) : (
					<span className='whitespace-nowrap px-4 text-sm'>
						No Recent Plays
					</span>
				)}
			</ul>
		</>
	);
};

export default RecentMenu;
