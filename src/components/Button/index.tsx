import { useEffect, useId, useRef } from 'react';

import { buttonClickSfx } from 'src/utils/sound';
import { cx } from 'src/utils/helper';

interface ButtonProps {
  label: string;
  className?: string;
  [any: string]: any;
}

const Button: React.FC<ButtonProps> = ({ label, className, handleClick }) => {
  const id = useId();
  const audioRef = useRef<any>(null);

  useEffect(() => {
    audioRef.current = new Audio('sounds/button-click.mp3');
    audioRef.current.load();
  }, []);

  const onClick = () => {
    if (audioRef.current) {
      buttonClickSfx(audioRef.current);
    }

    handleClick();
  };

  return (
    <button
      className={cx(
        'relative h-24 w-1/2 rounded-3xl border-8 px-10 pt-2 text-6xl font-medium transition-all hover:bg-opacity-30 active:translate-y-0.5',
        className ? className : '',
      )}
      onClick={onClick}
      key={`button-${id}`}
    >
      {label}
    </button>
  );
};

export default Button;
