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
        <img src='/images/win_logo.png' alt='logo' />
        <div className='relative flex flex-col items-center'>
          <div className='absolute z-0 h-full w-full bg-[#9bdc6f]  bg-opacity-50 blur-[100px]' />
          <p className='relative z-[1] rounded-3xl border-8 border-[#9bdc6f] bg-[#325719] px-14 py-4 text-[80px] shadow-[0_10px_0_0_#4f7f2f]'>
            you won
          </p>
          <p className='relative z-[1] mx-auto w-4/5 rounded-3xl bg-[#9bdc6f] text-center text-5xl text-black shadow-[0_10px_0_0_#4f7f2f]'>
            {betAmount} sui
          </p>
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
