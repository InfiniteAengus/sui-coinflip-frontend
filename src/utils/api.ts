import axios from 'axios';

export const getRecent = async () => {
  // return [
  //   {
  //     betAmount: '1000000000',
  //     address: '0x8f13542c0f00656a5f82c60c71cef33a5cf802a35a51442b377015b7473f1407',
  //     timestamp: 1684184759606,
  //     won: true,
  //   },
  //   {
  //     betAmount: '1000000000',
  //     address: '0x8f13542c0f00656a5f82c60c71cef33a5cf802a35a51442b377015b7473f1407',
  //     timestamp: 1684184770661,
  //     won: false,
  //   },
  //   {
  //     betAmount: '1000000000',
  //     address: '0x8f13542c0f00656a5f82c60c71cef33a5cf802a35a51442b377015b7473f1407',
  //     timestamp: 1684184781007,
  //     won: false,
  //   },
  // ];
  const playData = (await axios.get('/api/recent')).data;
  return playData;
};

export const getLeaderboard = async () => {
  const leaderboard = (await axios.get('/api/leaderboard')).data;
  return leaderboard;
};
