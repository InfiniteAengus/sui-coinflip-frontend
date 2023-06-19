import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from 'src/api';

export const getRecentHistory = createAsyncThunk('history/getRecentHistory', async () => {
  const res = await API.getGamesRequest();
  const sortedData = res.data.games.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  const result = sortedData.map((game: any) => ({
    id: game.gameId,
    dateCreated: game.createdAt,
    dateEnded: game.updatedAt,
    coinSide: game.guess === 1 ? 'head' : 'tails',
    result: game.playerWon,
    player: game.player,
    balance: game.balance,
    txnDigest: game.txnDigest,
  }));
  return result;
});

export const historySlice = createSlice({
  name: 'appStatus',
  initialState: [] as any[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecentHistory.fulfilled, (state, action) => {
      state = [...action.payload];
      return state;
    });
  },
});

export default historySlice.reducer;
