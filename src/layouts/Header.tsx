import { useWalletKit } from '@mysten/wallet-kit';
import { useNavigate } from 'react-router-dom';

import MusicButton from 'src/components/Button/MusicButton';
import SoundButton from 'src/components/Button/SoundButton';
import Leaderboard from 'src/components/Leaderboard';
import Recent from 'src/components/Recent';
import useBalance from 'src/hooks/useBalance';

const Header = () => {
	const navigate = useNavigate();

	const { currentAccount, disconnect: walletDisconnect } = useWalletKit();
	const { balance } = useBalance(currentAccount?.address);

	const disconnect = async () => {
		await walletDisconnect();
		navigate('/');
	};

	return (
		<header className='relative z-[2]'>
			<div className='px-10 py-5'>
				<div className='flex justify-between'>
					<div className='flex h-fit space-x-4'>
						<SoundButton />
						<MusicButton />
					</div>
					<div className='flex space-x-4'>
						<Recent />
						<Leaderboard />
						{currentAccount && (
							<div className='flex cursor-pointer flex-col items-center space-y-1'>
								<img src='/images/sui.png' width={36} onClick={disconnect} />
								<span className='text-sm'>{`${balance ?? '100'} sui`}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
