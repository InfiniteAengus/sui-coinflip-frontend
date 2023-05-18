import Confetti from 'react-confetti/';
import { useWindowSize } from '@react-hook/window-size';

import Button from '@/components/Button';

interface Props {
  betAmount: number;
  claimWinning: () => void;
}

const Won: React.FC<Props> = ({ betAmount, claimWinning }) => {
  const [width, height] = useWindowSize();

  return (
    <>
      <div className='flex flex-col items-center space-y-16'>
        <img src='/images/smile-coin.png' width={360} />
        <div className='flex flex-col items-center'>
          <p className='text-[80px]'>you won!</p>
          <div className='rounded-md bg-black px-16 py-2 text-5xl text-green'>
            {betAmount < 10 ? betAmount + '.0' : betAmount} sui
          </div>
        </div>
        <button
          className='rounded-3xl bg-primary px-20 py-4 text-[60px] text-white shadow-[0px_12px_#242424]'
          onClick={claimWinning}
        >
          claim winning
        </button>
      </div>
      <Confetti width={width ? width : 1920} height={height ? height : 1500} recycle={false} />
    </>
  );
};

export default Won;
