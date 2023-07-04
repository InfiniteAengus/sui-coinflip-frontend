import { useState } from 'react';

import { useAppSelector } from 'src/hooks/redux';

import RecentMenu from './Menu';

const Recent = () => {
	const recentData = useAppSelector(state => state.history.games);
	const [menuVisible, setMenuVisible] = useState<boolean>(false);

	return (
		<div className='relative h-fit'>
			<div
				className='hidden h-fit cursor-pointer items-center space-x-3 rounded-full border-[3.5px] border-[#6397f7] bg-[#2e477d] px-4 py-1 sm:flex'
				onClick={() =>
					setMenuVisible(prev => {
						return !prev;
					})
				}
			>
				<span className='pt-1 text-sm'>RECENT GAMES</span>
				<img
					src='/images/dropdown.png'
					className='h-[8px] w-[12px] brightness-0 invert'
				/>
			</div>
			<RecentMenu
				open={menuVisible}
				data={recentData}
				onClose={() => setMenuVisible(false)}
			/>
		</div>
	);
};

export default Recent;
