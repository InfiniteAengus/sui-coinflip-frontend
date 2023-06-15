interface Props {
  guess: string;
  betAmount: number;
}

const Deposit: React.FC<Props> = ({ guess, betAmount }) => {
  return (
    <div className='flex flex-col items-center space-y-16'>
      <img src='/images/logo.png' alt='logo' />
      <div className='relative'>
        <div className='rounded-3xl border-8 border-[#6fbbee] bg-[#2e4d7d] px-14 py-4 shadow-[0_10px_0_0_#2c5977]'>
          <p className='text-center text-5xl'>waiting for</p>
          <p className='-mt-2 text-center text-[75px] leading-[75px]'>Deposit</p>
        </div>
        <p className='mx-auto w-4/5 rounded-3xl bg-[#6fbbee] text-center text-4xl text-black shadow-[0_10px_0_0_#2c5977]'>
          {guess} for {betAmount} sui
        </p>
      </div>
    </div>
  );
};

export default Deposit;
