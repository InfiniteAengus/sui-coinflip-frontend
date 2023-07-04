import AnimatedCoin from 'src/components/AnimationGif/AnimatedCoin';

interface Props {
	guess: string;
	betAmount: number;
}

const Deposit: React.FC<Props> = ({ guess, betAmount }) => {
	return (
		<div className='flex flex-col items-center space-y-8'>
			<AnimatedCoin className='w-[360px]' />
			<div className='relative'>
				<div className='rounded-xl border-4 border-[#6fbbee] bg-[#2e4d7d] px-6 py-2 shadow-[0_5px_0_0_#2c5977]'>
					<p className='text-center text-2xl'>waiting for</p>
					<p className='-mt-2 text-center text-3xl leading-8'>Deposit</p>
				</div>
				<p className='mx-auto w-4/5 rounded-xl bg-[#6fbbee] px-2 pt-1 text-center text-base text-black shadow-[0_5px_0_0_#2c5977]'>
					{guess} for {betAmount} sui
				</p>
			</div>
		</div>
	);
};

export default Deposit;
