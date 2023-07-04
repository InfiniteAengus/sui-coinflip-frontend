import AnimatedCoin from 'src/components/AnimationGif/AnimatedCoin';
import Button from 'src/components/Button';

interface Props {
	betAmount: number;
	callback: () => void;
}

const Lost: React.FC<Props> = ({ betAmount, callback }) => {
	return (
		<div className='flex flex-col items-center space-y-16'>
			<div className='relative'>
				<AnimatedCoin />
				<img
					src='/images/failed_logo.png'
					alt='win'
					className='absolute -left-3 -top-4 -translate-x-1/2 -translate-y-1/2'
				/>
			</div>
			<div className='relative !mb-20 flex flex-col items-center'>
				<div className='absolute z-0 h-full w-full bg-red blur-[100px]' />
				<p className='relative z-[1] rounded-3xl border-8 border-[#d64d4d] bg-[#984040] px-14 pb-4 pt-8 text-[80px] shadow-[0_10px_0_0_#992b2b]'>
					you lost
				</p>
				<p className='relative z-[1] mx-auto w-4/5 rounded-3xl bg-[#d64d4d] pt-2 text-center text-5xl text-black shadow-[0_10px_0_0_#992b2b]'>
					{betAmount} sui
				</p>
			</div>
			<Button
				label='try again'
				className='h-36 w-auto border-[#f5cf54] bg-[#c08819]'
				arrow
				handleClick={callback}
			/>
		</div>
	);
};

export default Lost;
