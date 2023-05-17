export interface PlayResult {
  timestamp: number;
  won: boolean;
  address: string;
  betAmount: number;
  gameId?: string;
  outcomeId?: string;
}

export interface LeaderboardProps {
  address: string;
  profit: number;
}