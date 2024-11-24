import { Player, PlayerKey } from "@/types/player";

let condition = -1;

export const sortPlayers = (
  players: Player[] | { [key: string]: Player[] },
  prevSortKey: PlayerKey,
  sortKey: PlayerKey
): Player[] | { [key: string]: Player[] } => {
  if (sortKey === prevSortKey) {
    condition *= -1;
  }

  if (!Array.isArray(players)) {
    players = Object.values(players).flat();
  }

  let sortedPlayer = [...players].sort((a, b) => {
    if (a?.[sortKey] < b?.[sortKey]) return condition;
    if (a?.[sortKey] > b?.[sortKey]) return condition * -1;
    return a.rank - b.rank;
  });

  if (sortKey === "countrycode") {
    //@ts-ignore
    sortedPlayer = sortedPlayer.reduce(
      (acc: { [key: string]: Player[] }, player: Player) => {
        const { countrycode } = player;
        if (!acc[countrycode]) {
          acc[countrycode] = [];
        }
        acc[countrycode].push(player);
        return acc;
      },
      {}
    );
  }

  return sortedPlayer;
};
