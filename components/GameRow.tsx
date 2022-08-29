import Game from "../lib/models/Game";
import Team from "../lib/models/Team";
import Image from "next/image";
import { STYLES } from "./styles";

import classNameBuilder from "../lib/utils/classNameBuilder";
import { ST } from "next/dist/shared/lib/utils";

interface CombinedTypes {
  game: Game;
}

const Combined = ({ game }: CombinedTypes) => {
  if (game.visitor.combined) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Cmb.
      </span>
    );
  }
  return <></>;
};

const highlightSelectedTeam = (
  team: Team,
  selectedTeam: Team | undefined,
  ...classes: Array<string>
): string => {
  if (selectedTeam && team.id == selectedTeam.id) {
    return classNameBuilder(...[...classes, ...[STYLES.selected]]);
  }
  {
    return classNameBuilder(...classes);
  }
};

const GameRow = (game: Game, selectedTeam: Team | undefined) => {
  return (
    <div
      key={game.number}
      className={"w-full flex " + (game.finished() ? "bg-blue-100" : "")}
    >
      <div className={classNameBuilder(STYLES["table.td"], STYLES["col.sm"])}>
        <a title={game.number}>{game.datetime.format("LT")}</a>
      </div>
      <div className={classNameBuilder(STYLES["table.td"], STYLES["col.xs"])}>
        {game.visitor.gender}
        <Combined game={game}></Combined>
      </div>
      <div
        className={highlightSelectedTeam(
          game.home,
          selectedTeam,
          STYLES["table.td"],
          STYLES["col.md"]
        )}
      >
        <div className="flex items-center justify-start">
          <div className="w-[32px] h-[32px] inline-block">
            <Image
              src={game.visitor.imageUrl()}
              alt="icon"
              layout="fixed"
              width={32}
              height={32}
            ></Image>
          </div>
          <div
            className={
              "pl-1 hidden sm:inline-block " +
              (game.winner() == "visitor" ? "font-semibold" : "")
            }
          >
            {game.visitor.name}
          </div>
        </div>
      </div>
      <div
        className={highlightSelectedTeam(
          game.visitor,
          selectedTeam,
          STYLES["table.td"],
          STYLES["col.md"]
        )}
      >
        <div className="flex items-center justify-start align-middle ">
          <div className="w-[32px] h-[32px] inline-block">
            <Image
              src={game.home.imageUrl()}
              alt="icon"
              layout="fixed"
              width={32}
              height={32}
            ></Image>
          </div>
          <div
            className={
              "pl-1 hidden sm:inline-block " +
              (game.winner() == "home" ? "font-semibold" : "")
            }
          >
            {game.home.name}
          </div>
        </div>
      </div>
      <div
        className={classNameBuilder(
          STYLES["table.td"],
          STYLES["col.md"],
          STYLES["droppable"]
        )}
      >
        {game.score}
      </div>
    </div>
  );
};

export default GameRow;
