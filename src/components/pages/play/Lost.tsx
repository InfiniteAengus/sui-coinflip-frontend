import Button from '@/components/Button';

interface Props {
  betAmount: number;
  tryAgain: () => void;
}

const Lost: React.FC<Props> = ({ betAmount, tryAgain }) => {
  return (
    <div className='flex flex-col items-center space-y-16'>
      <div className='space-y-8'>
        <img src='/images/cry-icon.png' width={360} />
        <div className='h-3 w-[360px] rounded-[100%] bg-[#242424]' />
      </div>
      <div className='flex flex-col items-center'>
        <p className='text-[80px]'>you lost!</p>
        <div className='rounded-md bg-black px-16 py-2 text-5xl text-red'>{betAmount} sui</div>
      </div>
      <button
        className='rounded-3xl bg-primary px-20 py-4 text-[60px] text-white shadow-[0px_12px_#242424]'
        onClick={tryAgain}
      >
        try again?
      </button>
    </div>
  );
};

export default Lost;
