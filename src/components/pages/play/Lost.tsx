import Button from '@/components/Button';

interface Props {
  betAmount: number;
  tryAgain: () => void;
}

const Lost: React.FC<Props> = ({ betAmount, tryAgain }) => {
  return (
    <div className='flex flex-col items-center space-y-16'>
      <div className='space-y-8'>
        <img src='/images/coin.png' width={360} />
        <div className='h-3 w-[360px] rounded-[100%] bg-[#242424]' />
      </div>
      <div className='flex flex-col items-center'>
        <p className='text-[80px]'>you lost</p>
        <div className='relative w-full rounded-md border-y-8 border-black bg-red px-16 py-2 text-center text-5xl'>
          {betAmount} sui
          <div className='absolute left-0 top-0 h-4 w-full border-x-8 border-black' />
          <div className='absolute bottom-0 left-0 h-4 w-full border-x-8 border-black' />
        </div>
      </div>
      <Button label='try again' className='h-36 w-auto' arrow handleClick={tryAgain} />
    </div>
  );
};

export default Lost;
