export type CoinSide = 'heads' | 'tails';
export type GameResult = 'win' | 'lost';
export interface GameHistory {
  id: string;
  coinSide: CoinSide;
  result: GameResult;
  balanceChange: number;
  dateCreated: string;
  dateEnded: string;
}

export type GameTransactionType = 'newGame' | 'playGame' | 'endGame';
export interface GameTransaction {
  type: GameTransactionType;
  id: string;
}

export interface PlayResult {
  id: string;
  balance: number;
  coinSide: 'head' | 'tails';
  dateCreated: string;
  dateEnded: string;
  player: string;
  result: boolean;
}

export interface LeaderboardProps {
  address: string;
  profit: number;
}
