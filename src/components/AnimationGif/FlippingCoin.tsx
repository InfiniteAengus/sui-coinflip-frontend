import { useLottie } from 'lottie-react';

import FlippingAnimation from 'src/data/flipping-coin.json';

interface FlippingCoinProps {
	className?: string;
}

const FlippingCoin = (props: FlippingCoinProps) => {
	const lottieOptions = {
		animationData: FlippingAnimation,
		autoplay: true,
		style: { display: 'flex', margin: 'auto' },
	};

	const { View } = useLottie({ ...lottieOptions, className: props.className });

	return View;
};

export default FlippingCoin;
