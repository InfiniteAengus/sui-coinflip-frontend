import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti/';

import AnimatedCoin from 'src/components/AnimationGif/AnimatedCoin';
import Button from 'src/components/Button';

interface Props {
	betAmount: number;
	callback: () => void;
}

const Won: React.FC<Props> = ({ betAmount, callback }) => {
	const [width, height] = useWindowSize();

	return (
		<>
			<div className='flex flex-col items-center space-y-16'>
				<div className='relative'>
					<AnimatedCoin className='w-[360px]' />
					<img
						src='/images/win_logo.png'
						alt='win'
						className='absolute left-0 top-0 w-[120px] -translate-x-1/2 -translate-y-1/2'
					/>
				</div>
				<div className='relative flex flex-col items-center'>
					<div className='absolute z-0 h-full w-full bg-[#9bdc6f]  bg-opacity-50 blur-[50px]' />
					<p className='relative z-[1] rounded-xl border-4 border-[#9bdc6f] bg-[#325719] px-7 pb-2 pt-4 text-[36px] shadow-[0_5px_0_0_#4f7f2f]'>
						you won
					</p>
					<p className='relative z-[1] mx-auto w-4/5 rounded-xl bg-[#9bdc6f] pt-1 text-center text-2xl text-black shadow-[0_5px_0_0_#4f7f2f]'>
						{betAmount} sui
					</p>
				</div>
				<Button
					label='try again'
					className='h-16 w-auto border-[#f5cf54] bg-[#c08819]'
					arrow
					handleClick={callback}
				/>
			</div>
			<Confetti
				width={width ? width * 2 : 1920}
				height={height ? height * 2 : 1500}
				recycle={false}
			/>
		</>
	);
};

export default Won;
