declare module 'react-confetti';

export interface ModalWrapperProps {
	children: React.ReactNode;
	className?: string;
	[any: string]: any;
}

export interface ModalProps {
	isOpen: boolean;
	closeModal: () => void;
	[any: string]: any;
}
