import FlippingCoin from 'src/components/AnimationGif/FlippingCoin';

interface Props {
	guess: string;
	betAmount: number;
}

const Flipping: React.FC<Props> = ({ guess, betAmount }) => {
	return (
		<div className='flex flex-col items-center'>
			<div className='relative'>
				<FlippingCoin className='w-[380px]' />
			</div>
			<div className='mt-[-40px]'>
				<div className='rounded-xl border-4 border-[#6fbbee] bg-[#2e4d7d] px-7 py-2 shadow-[0_5px_0_0_#2c5977]'>
					<p className='text-center text-3xl'>flipping</p>
				</div>
				<p className='mx-auto w-4/5 rounded-xl bg-[#6fbbee] px-1 pt-1 text-center text-base text-black shadow-[0_5px_0_0_#2c5977]'>
					{guess} for {betAmount} sui
				</p>
			</div>
		</div>
	);
};

export default Flipping;
