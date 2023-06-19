import API from 'src/api';

export const getRecentHistoryData = async (currentPage: number = 1, PAGE_SIZE: number = 5) => {
  const res = await API.getGamesRequest();
  const sortedData = res.data.games.sort((a: any, b: any) => {
    return new Date(b.details.date_created).getTime() - new Date(a.details.date_created).getTime();
  });
  const paginatedData = sortedData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const result = paginatedData.map((game: any) => ({
    id: game.gameId,
    dateCreated: game.details.date_created,
    dateEnded: game.details.date_ended,
    coinSide: game.details.guess === 1 ? 'head' : 'tails',
    result: game.details.player_won,
    player: game.details.player,
    balance: game.details.balance,
  }));
  return result;
};
