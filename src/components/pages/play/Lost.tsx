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
				<AnimatedCoin className='w-[360px]' />
				<img
					src='/images/failed_logo.png'
					alt='win'
					className='absolute -left-3 -top-4 w-[150px] -translate-x-1/2 -translate-y-1/2'
				/>
			</div>
			<div className='relative !mb-10 flex flex-col items-center'>
				<div className='absolute z-0 h-full w-full bg-red blur-[50px]' />
				<p className='relative z-[1] rounded-xl border-4 border-[#d64d4d] bg-[#984040] px-7 pb-2 pt-4 text-[36px] shadow-[0_5px_0_0_#992b2b]'>
					you lost
				</p>
				<p className='relative z-[1] mx-auto w-4/5 rounded-xl bg-[#d64d4d] pt-1 text-center text-2xl text-black shadow-[0_5px_0_0_#992b2b]'>
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
	);
};

export default Lost;
