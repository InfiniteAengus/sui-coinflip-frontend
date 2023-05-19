import { useId } from 'react';

import DropdownIcon from '@/assets/icons/dropdown.svg';

import { cx } from '@/utils/sound';

interface ButtonProps {
  label: string;
  className?: string;
  selected?: boolean;
  arrow?: boolean;
  [any: string]: any;
}

const Button: React.FC<ButtonProps> = ({ label, className, handleClick, selected, arrow }) => {
  const id = useId();
  return (
    <button
      className={cx(
        'trans main-button group relative h-24 w-1/2 border-y-8 border-black px-4 text-4xl font-bold hover:bg-primary hover:bg-opacity-30 active:translate-y-0.5',
        selected ? 'bg-primary' : 'bg-transparent',
        className ? className : '',
      )}
      onClick={handleClick}
      key={`button-${id}`}
    >
      <div className='absolute left-0 top-0 h-[20px] w-full border-x-8 border-black' />
      <div className='absolute bottom-0 left-0 h-[20px] w-full border-x-8 border-black' />
      {label}
      {arrow && (
        <>
          <div className='trans absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 scale-150 group-hover:translate-x-4'>
            <DropdownIcon />
            <DropdownIcon />
          </div>
          <div className='trans absolute -right-10 top-1/2 -translate-y-1/2 rotate-90 scale-150 group-hover:-translate-x-4'>
            <DropdownIcon />
            <DropdownIcon />
          </div>
        </>
      )}
    </button>
  );
};

export default Button;
