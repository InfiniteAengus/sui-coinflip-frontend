import { shortenAddress, cx } from 'src/utils/helper';
import { useId } from 'react';

interface MenuProps {
  data: Array<any>;
  open: boolean;
  onClose: () => void;
}

const LeaderboardMenu: React.FC<MenuProps> = (props) => {
  const { data, open, onClose } = props;
  const id = useId();

  if (!open) {
    return <></>;
  }

  return (
    <>
      <div className='fixed left-0 top-0 z-[0] h-full w-full' onClick={onClose} />
      <ul
        className={cx(
          open ? 'block' : 'hidden',
          'border-gray absolute left-1/2 top-[calc(100%+10px)] z-[3] -translate-x-1/2 rounded-xl bg-[#1C1E2d] py-2 shadow-lg',
        )}
      >
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, key) => (
            <div
              className='relative w-full cursor-pointer flex-col items-center gap-9 bg-[#1C1E2d] px-4 py-3 hover:bg-[#323f68]'
              key={`${id}-${key}`}
            >
              <div className='flex gap-2 text-lg'>
                <span className='whitespace-nowrap'>{`${shortenAddress(item.player)} earned ${
                  item.profit / 1000000000
                } sui`}</span>
              </div>
            </div>
          ))
        ) : (
          <span className='whitespace-nowrap px-4 text-lg'>No Recent Plays</span>
        )}
      </ul>
    </>
  );
};

export default LeaderboardMenu;
