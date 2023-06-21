import { useLottie } from 'lottie-react';
interface AnimationGifProps {
  className?: string;
  options?: any;
}

const AnimationGif = (props: AnimationGifProps) => {
  const { options } = props;

  const lottieOptions = {
    ...options,
    style: { display: 'flex', margin: 'auto' },
  };

  const { View } = useLottie({ ...lottieOptions, className: props.className });

  return View;
};

export default AnimationGif;
