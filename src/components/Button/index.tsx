import { useEffect, useId, useRef } from 'react';

import { cx } from 'src/utils/helper';
import { buttonClickSfx } from 'src/utils/sound';

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
				'relative h-14 w-1/2 rounded-xl border-4 px-4 pt-1 text-3xl font-medium transition-all hover:bg-opacity-30 active:translate-y-0.5',
				className
			)}
			onClick={onClick}
			key={`button-${id}`}
		>
			{label}
		</button>
	);
};

export default Button;
