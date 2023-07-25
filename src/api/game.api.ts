import { api } from 'src/libs/axios';

export const registerGameRequest = (
	gameId: string,
	txnDigest: string,
	player: string,
	balance: number
) => {
	const requestUrl = `/register`;
	const body = { gameId, txnDigest, player, balance };
	return api.post(requestUrl, body);
};

export const playGameRequest = (
	gameId: string,
	txnDigest: string,
	userRandomnessHexString: string,
	player: string,
	balance: number
) => {
	const requestUrl = `/play`;
	const body = { gameId, txnDigest, userRandomnessHexString, player, balance };
	return api.post(requestUrl, body);
};

export const blsSignGameRequest = (gameId: string, userRandomness: string) => {
	const gameId_ = gameId.replace('0x', '').concat(userRandomness);
	const requestUrl = `/sign`;
	const body = { gameId: gameId_ };
	return api.post(requestUrl, body);
};

export const endGameRequest = (gameId: string, blsSig: any) => {
	const requestUrl = `/single/end`;
	const body = { gameId, blsSig };
	return api.post(requestUrl, body);
};

export const getHistoryRequest = () => {
	const requestUrl = `/history`;
	return api.get(requestUrl);
};

export const getLeaderboardRequest = () => {
	const requestUrl = `/leaderboard`;
	return api.get(requestUrl);
};

export const postAddEmail = (email: string) => {
	const requestUrl = `/advertise`;
	const body = { email };
	return api.post(requestUrl, body);
};
