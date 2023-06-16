import { cx } from 'src/utils/helper';

interface SelectableButtonProps {
  label: string;
  className: string;
  selectedClassName?: string;
  selected: boolean;
  handleClick: () => void;
}

const SelectableButton = (props: SelectableButtonProps) => {
  const { label, className, selectedClassName = '', selected, handleClick } = props;

  return (
    <button
      className={cx(
        'rounded-[40px] border-8  py-4 text-3xl  transition-all  md:text-5xl',
        className ? className : '',
        selected ? `${selectedClassName}` : '',
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default SelectableButton;
