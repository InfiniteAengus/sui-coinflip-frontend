interface ButtonProps {
  label: string;
  className?: string;
  extraClassName?: string;
  [any: string]: any;
}

const Button: React.FC<ButtonProps> = ({ label, className, extraClassName, onClick, selected }) => {
  return (
    <button className={`pushable ${className} ${extraClassName}`} onClick={onClick}>
      <span className={`${selected ? 'selected' : ''} front ${className}`}>{label}</span>
    </button>
  );
};

export default Button;
