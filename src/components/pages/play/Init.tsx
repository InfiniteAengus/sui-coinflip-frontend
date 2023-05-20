import Button from '@/components/Button';

interface Props {
  guess: string;
  setGuess: (arg: string) => void;
  betAmount: number;
  setBetAmount: (arg: number) => void;
  play: (guess: string, betAmount: number) => void;
}

const Init: React.FC<Props> = ({ guess, setGuess, betAmount, setBetAmount, play }) => {
  const handleClickGuess = (arg: string): void => {
    setGuess(arg);
  };

  const handleClickBetAmount = (arg: number): void => {
    setBetAmount(arg);
  };

  const handlePlayGame = (): void => {
    if (guess === '' || betAmount === 0) return;

    play(guess, betAmount);
  };

  return (
    <div className='space-y-32'>
      <div className='flex flex-col items-center space-y-20'>
        <img src='/images/coin.png' width={360} />
        <div className='mt-10 flex flex-col items-center space-y-6'>
          <div className='flex w-full gap-10'>
            {['heads', 'tails'].map((label: string) => (
              <Button
                label={label}
                selected={guess === label}
                handleClick={() => handleClickGuess(label)}
                key={`btn-${label}`}
              />
            ))}
          </div>
          <h4 className='text-5xl'>for</h4>
          <div className='grid grid-cols-3 gap-5'>
            {[1, 2, 5, 10, 25, 50].map((amount: number) => (
              <Button
                label={`${amount} sui`}
                handleClick={() => handleClickBetAmount(amount)}
                key={`btn-${amount}`}
                selected={betAmount === amount}
                className='w-60 max-w-full'
              />
            ))}
          </div>
        </div>
        <Button
          label='play'
          handleClick={handlePlayGame}
          className='h-36 w-auto !px-12 text-6xl'
          arrow
        />
        <div className='flex space-x-4 text-2xl'>
          <a
            href='https://docs.desuiflip.io/faqs'
            target='_blank'
            rel='noreferrer'
            className='hover:opacity-80'
          >
            faq
          </a>
          <span>|</span>
          <a
            href='https://docs.desuiflip.io/how-to-play'
            target='_blank'
            rel='noreferrer'
            className='hover:opacity-80'
          >
            how to play
          </a>
          <span>|</span>
          <a
            href='https://docs.desuiflip.io/flip-responsibly'
            target='_blank'
            rel='noreferrer'
            className='hover:opacity-80'
          >
            Flip responsibly
          </a>
        </div>
      </div>
    </div>
  );
};

export default Init;
