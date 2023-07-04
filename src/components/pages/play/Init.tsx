import AnimatedCoin from 'src/components/AnimationGif/AnimatedCoin';
import PlayButton from 'src/components/Button/PlayButton';
import SelectableButton from 'src/components/Button/SelectableButton';

interface Props {
	guess: string;
	setGuess: (arg: string) => void;
	betAmount: number;
	setBetAmount: (arg: number) => void;
	play: (guess: string, betAmount: number) => void;
}

const Init: React.FC<Props> = ({
	guess,
	setGuess,
	betAmount,
	setBetAmount,
	play,
}) => {
	const handleClickGuess = (arg: string): void => {
		setGuess(arg);
	};

	const handleClickBetAmount = (arg: number): void => {
		setBetAmount(arg);
	};

	const handlePlayGame = (): void => {
		if (guess === '' || betAmount === 0) return;

		play(guess, betAmount * 1000000000);
	};

	return (
		<div className='space-y-32'>
			<div className='flex flex-col items-center space-y-10'>
				<AnimatedCoin className='w-[360px]' />
				<div className='my-5 flex flex-col items-center space-y-3'>
					<div className='flex w-full gap-5'>
						{['heads', 'tails'].map((label: string) => (
							<SelectableButton
								key={`btn-${label}`}
								label={label}
								selected={guess === label}
								handleClick={() => handleClickGuess(label)}
								className='w-1/2 border-white bg-transparent hover:bg-white/10'
								selectedClassName='!bg-[#382610]'
							/>
						))}
					</div>
					<h4 className='text-2xl'>for</h4>
					<div className='!mt-8 grid grid-cols-3 gap-3 pb-5'>
						{[1, 2, 5, 10, 25, 50].map((amount: number) => (
							<SelectableButton
								key={`btn-${amount}`}
								label={`${amount} sui`}
								handleClick={() => handleClickBetAmount(amount)}
								selected={betAmount === amount}
								className='w-32 max-w-full border-[#fab600] bg-[#ffdf55] text-black hover:bg-[#fffe80]'
								selectedClassName='!border-[#94523B] !bg-[#FF8D65]'
							/>
						))}
					</div>
				</div>
				<PlayButton handleClick={handlePlayGame} />
			</div>
		</div>
	);
};

export default Init;
