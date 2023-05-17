import Button from '@/components/Button';

import { cx, buttonClickSfx } from '@/utils/sound';

interface Props {
  guess: string;
  setGuess: (arg: string) => void;
  betAmount: number;
  setBetAmount: (arg: number) => void;
  play: (guess: string, betAmount: number) => void;
}

const Init: React.FC<Props> = ({ guess, setGuess, betAmount, setBetAmount, play }) => {
  const handleClickGuess = (arg: string): void => {
    buttonClickSfx();
    setGuess(arg);
  };

  const handleClickBetAmount = (arg: number): void => {
    buttonClickSfx();
    setBetAmount(arg);
  };

  const handlePlayGame = (): void => {
    buttonClickSfx();
    if (guess === '' || betAmount === 0) return;

    play(guess, betAmount);
  };

  return (
    <div className='space-y-32'>
      <div className='flex flex-col items-center space-y-20'>
        <img src='/images/smile-coin.png' width={360} />
        <div className='mt-10 flex flex-col items-center space-y-6'>
          <div className='flex w-full gap-10'>
            {['heads', 'tails'].map((label: string, ind: number) => (
              <button
                className={cx(
                  'trans main-button h-24 w-1/2 rounded-[36px] text-4xl font-bold text-white shadow-[0px_8px_#242424] active:translate-y-0.5',
                  guess === label ? 'bg-secondary' : 'bg-primary',
                )}
                onClick={() => handleClickGuess(label)}
                key={ind}
              >
                {label}
              </button>
            ))}
          </div>
          <h4 className='text-5xl'>for</h4>
          <div className='grid grid-cols-3 gap-5'>
            {[1, 2, 5, 10, 25, 50].map((amount: number, ind: number) => (
              <button
                className={cx(
                  'trans main-button h-24 w-60 max-w-full rounded-3xl text-4xl font-bold text-white shadow-[0px_6px_#242424] active:translate-y-0.5',
                  betAmount === amount ? 'bg-secondary' : 'bg-primary',
                )}
                onClick={() => handleClickBetAmount(amount)}
                key={ind}
              >
                {amount} sui
              </button>
            ))}
          </div>
        </div>
        <Button
          label='play'
          className='!rounded-[40px] !bg-[#1D4F88] !text-4xl'
          extraClassName='!bg-[#091B2E]'
          onClick={handlePlayGame}
        />
        <div className='flex space-x-4 text-2xl'>
          <a
            href='https://docs.desuiflip.io/'
            target='_blank'
            rel='noreferrer'
            className='hover:opacity-80'
          >
            faq
          </a>
          <span>|</span>
          <a
            href='https://docs.desuiflip.io/'
            target='_blank'
            rel='noreferrer'
            className='hover:opacity-80'
          >
            how to play
          </a>
          <span>|</span>
          <a href='' target='_blank' rel='noreferrer' className='hover:opacity-80'>
            Flip responsibly
          </a>
        </div>
      </div>
    </div>
  );
};

export default Init;
