import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from 'src/api';

export const getRecentHistory = createAsyncThunk('history/getRecentHistory', async () => {
  const { data: historyData } = await API.getHistoryRequest();
  const { data: leaderboardData } = await API.getLeaderboardRequest();

  const result = historyData.rows.map((game: any) => ({
    id: game.gameId,
    dateCreated: game.createdAt,
    dateEnded: game.updatedAt,
    coinSide: game.guess === 1 ? 'head' : 'tails',
    result: game.playerWon,
    player: game.player,
    balance: game.balance,
    txnDigest: game.txnDigest,
  }));

  return { games: result, leaderboards: leaderboardData.rows };
});

export const historySlice = createSlice({
  name: 'appStatus',
  initialState: { games: [] as any[], leaderboards: [] as any[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecentHistory.fulfilled, (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    });
  },
});

export default historySlice.reducer;
