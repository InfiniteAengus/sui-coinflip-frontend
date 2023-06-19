import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from 'src/api';

export const getRecentHistory = createAsyncThunk('history/getRecentHistory', async () => {
  const res = await API.getGamesRequest();
  const sortedData = res.data.games.sort((a: any, b: any) => {
    return new Date(b.details.date_created).getTime() - new Date(a.details.date_created).getTime();
  });
  const result = sortedData.map((game: any) => ({
    id: game.gameId,
    dateCreated: game.details.date_created,
    dateEnded: game.details.date_ended,
    coinSide: game.details.guess === 1 ? 'head' : 'tails',
    result: game.details.player_won,
    player: game.details.player,
    balance: game.details.balance,
    txnDigest: game.details.txn_digest,
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
