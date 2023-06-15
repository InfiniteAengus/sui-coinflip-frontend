import { useLottie } from 'lottie-react';
import FlippingAnimation from '@/data/flipping-coin.json';

interface FlippingCoinProps {
  className?: string;
}

const options = {
  animationData: FlippingAnimation,
  loop: true,
  style: { width: '500px', display: 'flex', margin: 'auto' },
};

const FlippingCoin = (props: FlippingCoinProps) => {
  const { View } = useLottie({ ...options, className: props.className });

  return <>{View}</>;
};

export default FlippingCoin;
