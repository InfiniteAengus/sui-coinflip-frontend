import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Deposit from 'src/components/pages/play/Deposit';
import Flipping from 'src/components/pages/play/Flipping';
import Init from 'src/components/pages/play/Init';
import Lost from 'src/components/pages/play/Lost';
import Won from 'src/components/pages/play/Won';
import { useGame } from 'src/hooks/useGame';
import { flippingSfx, loseSfx, winSfx } from 'src/utils/sound';

const Play = () => {
	const [status, setStatus] = useState<string>('init');
	const [guess, setGuess] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);
	const { gameResult, betAmount, isLoading, handlePlayGame, handleEndGame } =
		useGame();

	useEffect(() => {
		const setWinningStatus = async () => {
			await new Promise(resolve => setTimeout(resolve, 2000));
			setStatus(gameResult || 'lose');
			(gameResult === 'win' ? winSfx : loseSfx)();
			toast[gameResult === 'win' ? 'success' : 'error'](
				`You ${gameResult === 'win' ? 'won' : 'lost'} :)`
			);
		};

		if (status === 'init' && isLoading) {
			setStatus('deposit');
		}

		if (status === 'deposit') {
			setTimeout(() => {
				setStatus('flipping');
				flippingSfx();
			}, 4000);
		}

		if (status === 'flipping' && gameResult) {
			setWinningStatus();
		}
	}, [status, gameResult, isLoading]);

	const handleTryAgain = (): void => {
		setStatus('init');
		setGuess('');
		setAmount(0);
		handleEndGame();
	};

	return (
		<div className='container pb-20'>
			{status === 'init' && (
				<Init
					guess={guess}
					setGuess={setGuess}
					betAmount={amount}
					setBetAmount={setAmount}
					play={handlePlayGame}
				/>
			)}
			{status === 'deposit' && <Deposit guess={guess} betAmount={amount} />}
			{status === 'flipping' && <Flipping guess={guess} betAmount={amount} />}
			{status === 'win' && (
				<Won
					betAmount={(betAmount * 2) / 1000000000}
					callback={handleTryAgain}
				/>
			)}
			{status === 'lost' && (
				<Lost betAmount={betAmount / 1000000000} callback={handleTryAgain} />
			)}
		</div>
	);
};

export default Play;
