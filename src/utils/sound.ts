export const cx = (...args: any[]) => args.filter(Boolean).join(' ');

export const buttonClickSfx = (): void => {
  const muted = JSON.parse(localStorage.getItem('muted') || 'false');

  if (muted) {
    return;
  }

  const audio = new Audio();
  audio.autoplay = true;
  audio.src = 'sounds/button-click.mp3';
  audio.volume = 1;
  audio.remove();
};

export const winSfx = (): void => {
  const muted = JSON.parse(localStorage.getItem('muted') || 'false');

  if (muted) {
    return;
  }
  const audio = new Audio();
  audio.autoplay = true;
  audio.src = 'sounds/win.mp3';
  audio.volume = 1;
  audio.remove();
};

export const loseSfx = (): void => {
  const muted = JSON.parse(localStorage.getItem('muted') || 'false');

  if (muted) {
    return;
  }
  const audio = new Audio();
  audio.autoplay = true;
  audio.src = 'sounds/lose.mp3';
  audio.volume = 1;
  audio.remove();
};

export const flippingSfx = (): void => {
  const muted = JSON.parse(localStorage.getItem('muted') || 'false');

  if (muted) {
    return;
  }

  const audio = new Audio();
  audio.autoplay = true;
  audio.src = 'sounds/flipping.wav';
  audio.volume = 1;
  audio.remove();
};
