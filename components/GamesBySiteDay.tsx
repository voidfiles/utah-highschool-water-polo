import Game from "../lib/models/Game";
import Team from "../lib/models/Team";
import GameRow from "./GameRow";
import { STYLES } from "./styles";
import classNameBuilder from "../lib/utils/classNameBuilder";

const GamesBySiteDay = (
  part: [string, Array<Game>],
  selectedTeam: Team | undefined
) => {
  return (
    <div key={part[0]}>
      <div className="w-full font-mono text-xs md:text-sm mb-10 divide-y divide-solid divide-slate-500">
        <div className="w-full">
          <div className="w-full bg-gray-50 ">
            <div className="py-2 pl-2 pr-3 text-left font-semibold text-gray-900 w-full">
              {part[0]}
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <div
            className={classNameBuilder(
              STYLES.header,
              STYLES["table.td"],
              STYLES["col.sm"]
            )}
          >
            Time
          </div>
          <div
            className={classNameBuilder(
              STYLES.header,
              STYLES["table.td"],
              STYLES["col.sm"]
            )}
          >
            Division
          </div>
          <div
            className={classNameBuilder(
              STYLES.header,
              STYLES["table.td"],
              STYLES["col.md"]
            )}
          >
            White Hats
          </div>
          <div
            className={classNameBuilder(
              STYLES.header,
              STYLES["table.td"],
              STYLES["col.md"]
            )}
          >
            Dark Hats
          </div>
          <div
            className={classNameBuilder(
              STYLES.header,
              STYLES["table.td"],
              STYLES["col.md"],
              STYLES["droppable"]
            )}
          >
            Score
          </div>
        </div>
        {part[1].map((game: Game) => {
          return GameRow(game, selectedTeam);
        })}
      </div>
    </div>
  );
};

export default GamesBySiteDay;
