import { useEffect, useState } from 'react';

import SoundOnIcon from '@/assets/icons/sound-on.svg';
import SoundOffIcon from '@/assets/icons/sound-off.svg';

const SoundButton = () => {
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    const savedMuted = JSON.parse(localStorage.getItem('muted') || 'false');
    setMuted(savedMuted);
  }, []);

  const handleMuteClick = () => {
    localStorage.setItem('muted', JSON.stringify(!muted));
    setMuted((prev) => !prev);
  };

  return (
    <button
      className='flex h-14 w-16 cursor-pointer items-center justify-center rounded-md border-[3px] border-black transition-all hover:bg-primary hover:bg-opacity-30'
      onClick={() => handleMuteClick()}
    >
      {muted ? <SoundOffIcon width={34} height={27} /> : <SoundOnIcon width={34} height={27} />}
    </button>
  );
};

export default SoundButton;
