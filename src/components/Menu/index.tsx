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
    <div className={cx(open ? 'block' : 'hidden', 'absolute left-0 top-[calc(100%+10px)]')}>
      {data.map((item, key) => (
        <div
          className='relative flex w-full items-center gap-9 rounded-md bg-white px-4 py-3 pr-[100px]'
          key={`${id}-${key}`}
        >
          <img src='/images/small-icon.png' className='h-14 w-14' />
          <div className='flex gap-2 text-xl'>
            <span>{`${shortenAddress(item.address)} flipped ${
              item.betAmount / 10 ** 9
            } sui and `}</span>
            <span className={`${item.won ? 'text-[#7DD955]' : 'text-[#E33030]'}`}>{`${
              item.won ? 'doubled 2 times' : 'got ruggged'
            }`}</span>
          </div>
          <span className='absolute bottom-1 right-5 text-xs'>
            {getTimeHistoryString(item.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Menu;
