import { cx } from '@/utils/sound';
import { getTimeHistoryString, shortenAddress } from '@/utils/helper';
import { useId } from 'react';

interface MenuProps {
  data: Array<any>;
  open: boolean;
}

const Menu: React.FC<MenuProps> = (props) => {
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
              <span className='whitespace-nowrap'>{`${shortenAddress(item.address)} flipped ${
                item.betAmount
              } sui and `}</span>
              <span
                className={`${item.won ? 'text-[#7DD955]' : 'text-[#E33030]'} whitespace-nowrap`}
              >{`${item.won ? 'doubled 2 times' : 'got ruggged'}`}</span>
            </div>
            <div className='flex w-full'>
              <span className='ml-auto text-xs'>{getTimeHistoryString(item.timestamp)}</span>
            </div>
          </div>
        ))
      ) : (
        <span className='whitespace-nowrap px-4 text-xl'>No Recent Plays</span>
      )}
    </div>
  );
};

export default Menu;
