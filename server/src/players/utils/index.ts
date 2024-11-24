import { PlayerWithMoneyDto } from '../dto/player.dto';

const percentages = [0.2, 0.15, 0.1];
const moneyPrize = 1000;

export function calculateRewards(rank: number): number {
  if (rank >= 100) return 0;
  if (rank < 3) {
    return moneyPrize * percentages[rank];
  }
  if (rank >= 3 && rank < 100) {
    const remainingPlayer = 100 - 3;
    const totalRank = (remainingPlayer * (remainingPlayer + 1)) / 2;
    const avarageTotalRank = totalRank / remainingPlayer;
    const percentage =
      (0.55 * ((remainingPlayer - (rank - 3)) / remainingPlayer)) /
      avarageTotalRank;
    return moneyPrize * Number(percentage.toFixed(3));
  }
}

export const sortPlayersByCountryAndRank = (players: PlayerWithMoneyDto[]) => {
  return [...players].sort((a, b) => {
    if (a.countrycode < b.countrycode) return -1;
    if (a.countrycode > b.countrycode) return 1;
    return a.rank - b.rank;
  });
};
