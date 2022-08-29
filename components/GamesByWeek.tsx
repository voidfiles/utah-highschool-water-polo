import Game from "../lib/models/Game";
import Team from "../lib/models/Team";
import partitionGames from "../lib/utils/partitionGames";
import GamesBySiteDay from "./GamesBySiteDay";
const GameByWeek = (
  week: [string, Array<Game>],
  i: number,
  selectedTeam: Team | undefined
) => {
  const gamesBySiteDay = partitionGames((game: Game) => {
    return game.datetime.format("ddd MMM D") + " at " + game.site.name;
  }, week[1]);
  return (
    <div key={i}>
      <div className="bg-white py-5">
        <h2 className="text-xl font-medium text-gray-900">Week {i + 1}</h2>
      </div>
      {gamesBySiteDay.map((set: [string, Array<Game>]) => {
        return GamesBySiteDay(set, selectedTeam);
      })}
    </div>
  );
};

export default GameByWeek;
