import { useState } from 'react';
import LeaderboardMenu from './Menu';
import { useAppSelector } from 'src/hooks/redux';

const Leaderboard = () => {
  const data = useAppSelector((state) => state.history.leaderboards);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  return (
    <div className='relative h-fit'>
      <div
        className='hidden h-fit cursor-pointer items-center space-x-5 rounded-full border-[6px] border-[#c75151] bg-[#753131] px-4 py-1 sm:flex'
        onClick={() =>
          setMenuVisible((prev) => {
            return !prev;
          })
        }
      >
        <span className='text-[22px]'>LEADERBOARD</span>
        <img src='/images/dropdown.png' className='h-[14px] w-[22px] brightness-0 invert' />
      </div>
      <LeaderboardMenu open={menuVisible} data={data} onClose={() => setMenuVisible(false)} />
    </div>
  );
};

export default Leaderboard;
