interface Props {
  guess: string;
  betAmount: number;
}

const Deposit: React.FC<Props> = ({ guess, betAmount }) => {
  return (
    <div className='flex flex-col items-center space-y-16'>
      <img src='/images/coin.png' width={480} />
      <div className='relative'>
        <p className='text-center text-5xl'>waiting for</p>
        <p className='-mt-10  text-center text-[75px]'>Deposit</p>
        <span className='absolute bottom-0 left-[-30px] h-1/2 w-[calc(100%+60px)] border-8 border-t-0 border-solid border-black' />
      </div>
      <p className='!mt-4 text-center text-4xl'>
        {guess} for {betAmount} sui
      </p>
    </div>
  );
};

export default Deposit;
