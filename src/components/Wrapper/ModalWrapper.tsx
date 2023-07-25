import type { ModalWrapperProps } from 'src/@types/global';

const ModalWrapper: React.FC<ModalWrapperProps> = ({
	children,
	className = '',
}) => {
	return (
		<div className='rounded-[22px] p-[3px] shadow-[3px_3px_6px_#00000029]'>
			<div
				className={`relative flex flex-col rounded-[22px] bg-black shadow-[3px_3px_6px_#00000029] ${className}`}
			>
				{children}
			</div>
		</div>
	);
};

export default ModalWrapper;
