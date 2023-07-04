import { useEffect, useState } from 'react';

import { ReactComponent as SoundOffIcon } from 'src/assets/icons/sound-off.svg';
import { ReactComponent as SoundOnIcon } from 'src/assets/icons/sound-on.svg';
import { cx } from 'src/utils/helper';

const SoundButton = () => {
	const [muted, setMuted] = useState<boolean>(false);

	useEffect(() => {
		const savedMuted = JSON.parse(localStorage.getItem('muted') || 'false');
		setMuted(savedMuted);
	}, []);

	const handleMuteClick = () => {
		localStorage.setItem('muted', JSON.stringify(!muted));
		setMuted(prev => !prev);
	};

	return (
		<button
			className={cx(
				'flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] bg-opacity-50  transition-all hover:bg-opacity-70',
				!muted
					? 'border-[#9bdc6f] bg-[#9bdc6f]'
					: 'border-[#c75151] bg-[#c75151]'
			)}
			onClick={() => handleMuteClick()}
		>
			{muted ? <SoundOffIcon width={20} /> : <SoundOnIcon width={20} />}
		</button>
	);
};

export default SoundButton;
