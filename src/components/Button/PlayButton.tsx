import { useEffect, useRef } from 'react';
import { buttonClickSfx } from 'src/utils/sound';

interface PlayButtonProps {
  handleClick: () => void;
}

const PlayButton = (props: PlayButtonProps) => {
  const { handleClick } = props;
  const playAudioRef = useRef<any>(null);

  useEffect(() => {
    playAudioRef.current = new Audio('sounds/play-button-click.mp3');
    playAudioRef.current.load();
  }, []);

  const onClick = () => {
    if (playAudioRef.current) {
      buttonClickSfx(playAudioRef.current);
    }

    handleClick();
  };

  return (
    <div className='relative cursor-pointer px-[75px] text-[110px] text-black' onClick={onClick}>
      <span className='relative z-[2]'>LFG!</span>
      <div className='absolute left-0 top-0 z-[1] h-full w-full rounded-3xl border-[6px] border-black bg-[#9bdc6f]' />
      <div className='absolute bottom-[-12px] left-0 z-[0] h-full w-full rounded-3xl bg-[#6EB440]' />
      <img src='/images/rainbow.png' alt='rainbow' className='absolute left-[50px] top-[-65px]' />
      <img src='/images/eye.png' alt='eye' className='absolute bottom-[-30px] left-[-30px] z-[2]' />
      <img
        src='/images/star.png'
        alt='star'
        className='absolute right-0 top-0 z-[2] -translate-y-1/2 translate-x-1/2'
      />
    </div>
  );
};

export default PlayButton;
