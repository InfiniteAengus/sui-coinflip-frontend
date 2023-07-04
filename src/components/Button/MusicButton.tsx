import { useEffect, useRef, useState } from 'react';

import { ReactComponent as MusicOffIcon } from 'src/assets/icons/music-off.svg';
import { ReactComponent as MusicIcon } from 'src/assets/icons/music.svg';
import { cx } from 'src/utils/helper';

const MusicButton = () => {
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [audioLoaded, setAudioLoaded] = useState<boolean>(false);
	const audioRef = useRef<any>(null);

	useEffect(() => {
		// Retrieve the mute status from localStorage on page load
		const storedMuteStatus = localStorage.getItem('music.muted');
		if (storedMuteStatus) {
			setIsMuted(JSON.parse(storedMuteStatus));
		}

		const isChrome =
			navigator.userAgent.includes('Chrome') &&
			navigator.vendor.includes('Google Inc');
		if (!isChrome) {
			document.getElementById('iframeAudio')?.remove();
		} else {
			document.getElementById('playAudio')?.remove();
		}
	}, []);

	useEffect(() => {
		// Store the mute status in localStorage whenever it changes
		localStorage.setItem('music.muted', JSON.stringify(isMuted));
	}, [isMuted]);

	useEffect(() => {
		if (audioLoaded) {
			if (isMuted) {
				audioRef.current.muted = true;
			} else {
				audioRef.current.muted = false;
				audioRef.current.play();
			}
		}
	}, [isMuted, audioLoaded]);

	useEffect(() => {
		if (audioRef.current) {
			const isChrome =
				navigator.userAgent.includes('Chrome') &&
				navigator.vendor.includes('Google Inc');

			if (!isChrome) {
				setAudioLoaded(true);
			}

			document.addEventListener('click', () => {
				setAudioLoaded(true);
			});

			return () => {
				document.addEventListener('click', () => {
					setAudioLoaded(true);
				});
			};
		}
	}, [audioRef]);

	const toggleMute = () => {
		setIsMuted(prevMuteStatus => !prevMuteStatus);
	};

	return (
		<button
			className={cx(
				'flex h-14 w-16 cursor-pointer items-center justify-center rounded-2xl border-[3px] bg-opacity-50  transition-all hover:bg-opacity-70',
				!isMuted
					? 'border-[#8567d8] bg-[#8567d8]'
					: 'border-[#c75151] bg-[#c75151]'
			)}
			onClick={() => toggleMute()}
		>
			<iframe
				src='/sounds/background.mp3'
				allow='autoplay'
				id='iframeAudio'
				className='hidden'
				ref={audioRef}
			></iframe>
			<audio autoPlay loop id='playAudio' ref={audioRef}>
				<source src='/sounds/background.mp3' type='audio/mpeg' />
			</audio>
			{isMuted ? (
				<MusicOffIcon width={40} />
			) : (
				<MusicIcon width={34} height={27} />
			)}
		</button>
	);
};

export default MusicButton;
