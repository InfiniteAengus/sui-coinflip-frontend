import Confetti from 'react-confetti/';
import { useWindowSize } from '@react-hook/window-size';

import Button from 'src/components/Button';
import AnimatedCoin from 'src/components/AnimationGif/AnimatedCoin';

interface Props {
  betAmount: number;
  callback: () => void;
}

const Won: React.FC<Props> = ({ betAmount, callback }) => {
  const [width, height] = useWindowSize();

  return (
    <>
      <div className='flex flex-col items-center space-y-16'>
        <div className='relative'>
          <AnimatedCoin />
          <img
            src='/images/win_logo.png'
            alt='win'
            className='absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2'
          />
        </div>
        <div className='relative flex flex-col items-center'>
          <div className='absolute z-0 h-full w-full bg-[#9bdc6f]  bg-opacity-50 blur-[100px]' />
          <p className='relative z-[1] rounded-3xl border-8 border-[#9bdc6f] bg-[#325719] px-14 pb-4 pt-8 text-[80px] shadow-[0_10px_0_0_#4f7f2f]'>
            you won
          </p>
          <p className='relative z-[1] mx-auto w-4/5 rounded-3xl bg-[#9bdc6f] pt-2 text-center text-5xl text-black shadow-[0_10px_0_0_#4f7f2f]'>
            {betAmount} sui
          </p>
        </div>
        <Button
          label='try again'
          className='h-36 w-auto border-[#f5cf54] bg-[#c08819]'
          arrow
          handleClick={callback}
        />
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
