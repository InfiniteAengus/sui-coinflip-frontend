import { useEffect, useState } from 'react';
import useSound from 'use-sound';

import { ReactComponent as MusicOffIcon } from 'src/assets/icons/music-off.svg';
import { ReactComponent as MusicIcon } from 'src/assets/icons/music.svg';
import { cx } from 'src/utils/helper';

const MusicButton = () => {
	const [muted, setMuted] = useState<boolean>(true);
	const [play, { sound }] = useSound('/sounds/background.mp3', {
		volume: 0.1,
		soundEnabled: true,
		interrupt: true,
	});

	useEffect(() => {
		const savedMuted = JSON.parse(
			localStorage.getItem('music-muted') || 'false'
		);
		setMuted(savedMuted);
	}, []);

	useEffect(() => {
		if (sound) {
			sound.volume(muted ? 0 : 0.1);
		}
	}, [muted, sound]);

	useEffect(() => {
		if (sound && play) {
			sound.volume(0.1);
			play();
		}
	}, [sound, play]);

	const handleMuteClick = () => {
		localStorage.setItem('music-muted', JSON.stringify(!muted));
		setMuted(prev => !prev);
	};

	return (
		<button
			className={cx(
				'flex h-14 w-16 cursor-pointer items-center justify-center rounded-2xl border-[3px] bg-opacity-50  transition-all hover:bg-opacity-70',
				!muted
					? 'border-[#8567d8] bg-[#8567d8]'
					: 'border-[#c75151] bg-[#c75151]'
			)}
			onClick={() => handleMuteClick()}
		>
			{muted ? (
				<MusicOffIcon width={40} />
			) : (
				<MusicIcon width={34} height={27} />
			)}
		</button>
	);
};

export default MusicButton;
