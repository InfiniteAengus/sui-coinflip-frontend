export const buttonClickSfx = (audio: HTMLAudioElement): void => {
  const muted = JSON.parse(localStorage.getItem('muted') || 'false');

  if (muted || !audio) {
    return;
  }

  // Clone the preloaded audio element and play it
  const audioClone: any = audio.cloneNode();
  audioClone.volume = 0.8;
  (audioClone as HTMLAudioElement).play();
};

export const winSfx = (): void => {
  const muted = JSON.parse(localStorage.getItem('muted') || 'false');

  if (muted) {
    return;
  }
  const audio = new Audio();
  audio.autoplay = true;
  audio.src = 'sounds/win.mp3';
  audio.volume = 0.8;
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
  audio.volume = 0.8;
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
  audio.volume = 0.8;
  audio.remove();
};
