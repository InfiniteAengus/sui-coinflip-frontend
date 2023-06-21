import FlippingCoin from 'src/components/FlippingCoin';

interface Props {
  guess: string;
  betAmount: number;
}

const Flipping: React.FC<Props> = ({ guess, betAmount }) => {
  return (
    <div className='flex flex-col items-center space-y-16'>
      <div className='relative'>
        <img src='/images/logo.png' alt='logo' />
        {/* <FlippingCoin className='absolute left-0 top-0 mx-auto' /> */}
      </div>
      <div>
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
