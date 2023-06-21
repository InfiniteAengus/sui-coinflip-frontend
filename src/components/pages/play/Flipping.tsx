import FlippingCoin from 'src/components/AnimationGif/FlippingCoin';
import AnimatedCoin from 'src/components/AnimationGif/AnimatedCoin';

interface Props {
  guess: string;
  betAmount: number;
}

const Flipping: React.FC<Props> = ({ guess, betAmount }) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='relative'>
        <FlippingCoin className='w-[900px]' />
      </div>
      <div className='mt-[-96px]'>
        <div className='rounded-3xl border-8 border-[#6fbbee] bg-[#2e4d7d] px-14 py-4 shadow-[0_10px_0_0_#2c5977]'>
          <p className='text-center text-6xl'>flipping</p>
        </div>
        <p className='mx-auto w-4/5 rounded-3xl bg-[#6fbbee] pt-1 text-center text-3xl text-black shadow-[0_10px_0_0_#2c5977]'>
          {guess} for {betAmount} sui
        </p>
      </div>
    </div>
  );
};

export default Flipping;
