import { homedir } from "os";
import moment from "moment";
import Division, { normalizeDivision } from "./Division";
import Site from "./Site";
import Team from "./Team";

export default class Game {
  site: Site;
  home: Team;
  visitor: Team;
  datetime: moment.Moment;
  number: string;
  divisions: Array<Division>;
  note: string;
  score: string;

  constructor(
    site: Site,
    home: Team,
    visitor: Team,
    datetime: moment.Moment,
    number: string,
    divisions: Array<Division>,
    note: string,
    score: string
  ) {
    this.site = site;
    this.home = home;
    this.visitor = visitor;
    this.datetime = datetime;
    this.number = number;
    this.divisions = divisions;
    this.note = note;
    this.score = score;
  }

  finished(): boolean {
    if (
      this.score.trim() == "" ||
      this.score.trim().toLowerCase() == "exhibition"
    ) {
      return false;
    }

    return true;
  }

  winner(): string {
    const matches = /([\d]+)-([\d]+)/.exec(this.score);
    if (!matches || matches.length == 0) {
      return "none";
    }
    if (parseInt(matches[2], 10) > parseInt(matches[1], 10)) {
      return "home";
    }

    if (parseInt(matches[1], 10) > parseInt(matches[2], 10)) {
      return "visitor";
    }

    return "none";
  }

  static toObject(game: Game) {
    return {
      site: {
        name: game.site.name,
      },
      home: {
        id: game.home.id,
      },
      visitor: {
        id: game.visitor.id,
      },
      datetime: game.datetime.toISOString(),
      number: game.number,
      divisions: game.divisions.map((d: Division) => {
        return d.toString();
      }),
      note: game.note,
      score: game.score,
    };
  }

  static fromObject(game: any): Game {
    return new Game(
      Site.items[game.site.name],
      Team.items[game.home.id],
      Team.items[game.visitor.id],
      moment(game.datetime),
      game.number,
      game.divisions.map((d: string): Division => {
        if (!d) {
          throw game;
        }
        return normalizeDivision(d);
      }),
      game.note,
      game.score
    );
  }
}
