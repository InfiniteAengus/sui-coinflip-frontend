import { useEffect, useRef } from 'react';

import { cx } from 'src/utils/helper';
import { buttonClickSfx } from 'src/utils/sound';

interface SelectableButtonProps {
	label: string;
	className: string;
	selectedClassName?: string;
	selected: boolean;
	handleClick: () => void;
}

const SelectableButton = (props: SelectableButtonProps) => {
	const {
		label,
		className,
		selectedClassName = '',
		selected,
		handleClick,
	} = props;

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
				'rounded-2xl border-2 py-2 text-base transition-all md:text-[22px]',
				className,
				selected ? `${selectedClassName}` : ''
			)}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default SelectableButton;
