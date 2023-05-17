import { cx } from '@/utils';
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
        'absolute left-0 top-[calc(100%+10px)] min-w-full bg-white p-2',
      )}
    >
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item, key) => (
          <div
            className='relative w-full flex-col items-center gap-9 border-2 bg-white px-4 py-3'
            key={`${id}-${key}`}
          >
            {/* <img src='/images/small-icon.png' className='h-14 w-14' /> */}
            <div className='flex gap-2 text-sm'>
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
        <>No Recent</>
      )}
    </div>
  );
};

export default Menu;
