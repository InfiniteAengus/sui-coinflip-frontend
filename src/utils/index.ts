export const cx = (...args: any[]) => args.filter(Boolean).join(' ');

export const buttonClickSfx = (): void => {
  const audio = new Audio();
  audio.autoplay = true;
  audio.src = 'sounds/button-click.mp3';
  audio.volume = 1;
  audio.remove();
};

export const winSfx = (): void => {
  const audio = new Audio();
  audio.autoplay = true;
  audio.src = 'sounds/win.mp3';
  audio.volume = 1;
  audio.remove();
};

export const loseSfx = (): void => {
  const audio = new Audio();
  audio.autoplay = true;
  audio.src = 'sounds/lose.mp3';
  audio.volume = 1;
  audio.remove();
};
