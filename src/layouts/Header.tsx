import { useNavigate } from 'react-router-dom';
import { useWalletKit } from '@mysten/wallet-kit';

import SoundButton from 'src/components/Button/SoundButton';
import Recent from 'src/components/Recent';
import Leaderboard from 'src/components/Leaderboard';
import useBalance from 'src/hooks/useBalance';
import MusicButton from 'src/components/Button/MusicButton';

const Header = () => {
  const navigate = useNavigate();

  const { currentAccount, disconnect: walletDisconnect } = useWalletKit();
  const { balance } = useBalance(currentAccount?.address!);

  const disconnect = async () => {
    await walletDisconnect();
    navigate('/');
  };

  return (
    <header style={{ zoom: '0.61' }} className='relative z-[2]'>
      <div className='px-10 py-5'>
        <div className='flex justify-between'>
          <div className='flex h-fit space-x-6'>
            <SoundButton />
            <MusicButton />
          </div>
          <div className='flex space-x-8'>
            <Recent />
            <Leaderboard />
            <div className='-mt-2.5 flex cursor-pointer flex-col items-center space-y-1.5'>
              <img src='/images/sui.png' width={60} onClick={disconnect} />
              <span className='text-[22px]'>{`${balance ?? '100'} sui`}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
