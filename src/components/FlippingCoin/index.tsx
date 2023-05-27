import { useLottie } from 'lottie-react';
import FlippingAnimation from '@/data/flipping-coin.json';

const options = {
  animationData: FlippingAnimation,
  loop: true,
  style: { width: '500px', display: 'flex', margin: 'auto' },
};

const FlippingCoin = () => {
  const { View } = useLottie(options);

  return <>{View}</>;
};

export default FlippingCoin;
