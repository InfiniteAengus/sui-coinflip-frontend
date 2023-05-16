interface Props {
  guess: string;
  betAmount: number;
}

const Flipping: React.FC<Props> = ({ guess, betAmount }) => {
  return (
    <div className='flex flex-col items-center space-y-16'>
      <img src='/images/smile-coin.png' width={360} />
      <div>
        <p className='text-center text-5xl'>flipping....</p>
        <p className='text-center text-4xl'>
          {guess} for {betAmount} sui
        </p>
      </div>
    </div>
  );
};

export default Flipping;
