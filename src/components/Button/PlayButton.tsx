import { useEffect, useRef } from 'react';

import { buttonClickSfx } from 'src/utils/sound';

interface PlayButtonProps {
	handleClick: () => void;
}

const PlayButton = (props: PlayButtonProps) => {
	const { handleClick } = props;
	const playAudioRef = useRef<any>(null);

	useEffect(() => {
		playAudioRef.current = new Audio('sounds/play-button-click.mp3');
		playAudioRef.current.load();
	}, []);

	const onClick = () => {
		if (playAudioRef.current) {
			buttonClickSfx(playAudioRef.current);
		}

		handleClick();
	};

	return (
		<div
			className='relative cursor-pointer px-[37px] text-5xl text-black'
			onClick={onClick}
		>
			<span className='relative top-1 z-[2]'>LFG!</span>
			<div className='absolute left-0 top-0 z-[1] h-full w-full rounded-xl border-[3px] border-black bg-[#9bdc6f]' />
			<div className='absolute bottom-[-6px] left-0 z-[0] h-full w-full rounded-xl bg-[#6EB440]' />
			<img
				src='/images/rainbow.png'
				alt='rainbow'
				className='absolute left-[25px] top-[-35px] w-[100px]'
			/>
			<img
				src='/images/eye.png'
				alt='eye'
				className='absolute bottom-[-15px] left-[-15px] z-[2] w-[64px]'
			/>
			<img
				src='/images/star.png'
				alt='star'
				className='absolute right-0 top-0 z-[2] w-[50px] -translate-y-1/2 translate-x-1/2'
			/>
		</div>
	);
};

export default PlayButton;
