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
        <img src='/images/coin.png' width={360} />
        <div className='flex flex-col items-center'>
          <p className='text-[80px]'>you won</p>
          <div className='relative w-full rounded-md border-y-8 border-black bg-green px-16 py-2 text-center text-5xl'>
            {betAmount} sui
            <div className='absolute left-0 top-0 h-4 w-full border-x-8 border-black' />
            <div className='absolute bottom-0 left-0 h-4 w-full border-x-8 border-black' />
          </div>
        </div>
        <Button label='claim winning' arrow handleClick={claimWinning} className='h-36 w-auto' />
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
