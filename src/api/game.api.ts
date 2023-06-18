import { api } from 'src/libs/axios';

export const registerGameRequest = (gameId: string, txnDigest: string) => {
  const requestUrl = `/game/register`;
  const body = { gameId, txnDigest };
  return api.post(requestUrl, body);
};

export const playGameRequest = (
  gameId: string,
  txnDigest: string,
  userRandomnessHexString: string,
) => {
  const requestUrl = `/game/play`;
  const body = { gameId, txnDigest, userRandomnessHexString };
  return api.post(requestUrl, body);
};

export const blsSignGameRequest = (gameId: string, userRandomness: string) => {
  const gameId_ = gameId.replace('0x', '').concat(userRandomness);
  const requestUrl = `/game/sign`;
  const body = { gameId: gameId_ };
  return api.post(requestUrl, body);
};

export const endGameRequest = (gameId: string, blsSig: any) => {
  const requestUrl = `/game/single/end`;
  const body = { gameId, blsSig };
  return api.post(requestUrl, body);
};

export const getGamesRequest = () => {
  const requestUrl = `/game/details`;
  return api.get(requestUrl);
};
