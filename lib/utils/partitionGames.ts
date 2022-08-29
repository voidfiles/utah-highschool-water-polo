import Game from "../models/Game";

type GamePartition = Array<[string, Array<Game>]>;

const partitionGames = (
  partitioner: Function,
  games: Array<Game>
): GamePartition => {
  const by: { [key: string]: Array<Game> } = {};
  const parts: Array<string> = [];
  games.forEach((game) => {
    const part = partitioner(game);
    if (!by[part]) {
      by[part] = [];
      parts.push(part);
    }

    by[part].push(game);
  });

  return parts.map((part) => {
    return [part, by[part]];
  });
};

export default partitionGames;
