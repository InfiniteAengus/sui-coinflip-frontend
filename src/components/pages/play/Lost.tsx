import Button from 'src/components/Button';

interface Props {
  betAmount: number;
  callback: () => void;
}

const Lost: React.FC<Props> = ({ betAmount, callback }) => {
  return (
    <div className='flex flex-col items-center space-y-16'>
      <img src='/images/failed_logo.png' alt='logo' />
      <div className='relative !mb-20 flex flex-col items-center'>
        <div className='absolute z-0 h-full w-full bg-red blur-[100px]' />
        <p className='relative z-[1] rounded-3xl border-8 border-[#d64d4d] bg-[#984040] px-14 py-4 text-[80px] shadow-[0_10px_0_0_#992b2b]'>
          you lost
        </p>
        <p className='relative z-[1] mx-auto w-4/5 rounded-3xl bg-[#d64d4d] text-center text-5xl text-black shadow-[0_10px_0_0_#992b2b]'>
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
  );
};

export default Lost;
