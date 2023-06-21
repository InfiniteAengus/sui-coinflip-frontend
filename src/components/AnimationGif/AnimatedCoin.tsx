import { useLottie } from 'lottie-react';

import AnimalWave from 'src/data/animal-wave.json';

const AnimatedCoin = (props: any) => {
  const { className } = props;
  const lottieOptions = {
    animationData: AnimalWave,
    autoplay: false,
    style: { display: 'flex', margin: 'auto' },
  };

  const { View, play, stop } = useLottie({ ...lottieOptions });
  return (
    <div onMouseOver={() => play()} onMouseLeave={() => stop()} className={className}>
      {View}
    </div>
  );
};

export default AnimatedCoin;
