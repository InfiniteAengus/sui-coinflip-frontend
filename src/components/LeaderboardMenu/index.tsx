import { shortenAddress, cx } from 'src/utils/helper';
import { useId } from 'react';

interface MenuProps {
  data: Array<any>;
  open: boolean;
}

const LeaderboardMenu: React.FC<MenuProps> = (props) => {
  const { data, open } = props;
  const id = useId();

  return (
    <div
      className={cx(
        open ? 'block' : 'hidden',
        'border-gray absolute left-0 top-[calc(100%+10px)] z-[2] border-4 border-solid bg-white p-2',
      )}
    >
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item, key) => (
          <div
            className='relative w-full flex-col items-center gap-9 border-2 bg-white px-4 py-3'
            key={`${id}-${key}`}
          >
            <div className='text-md flex gap-2'>
              <span className='whitespace-nowrap'>{`${shortenAddress(item.address)} earned ${
                item.profit
              } sui`}</span>
            </div>
          </div>
        ))
      ) : (
        <span className='whitespace-nowrap px-4 text-xl'>No Recent Plays</span>
      )}
    </div>
  );
};

export default LeaderboardMenu;
