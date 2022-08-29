import Game from "./Game";

const CURRENT_ICONS = [
  "bearriver",
  "cedar",
  "kearns",
  "ogden",
  "parkcity",
  "southdavis",
  "waterpolo",
  "brighton",
  "cyprus",
  "murray",
  "olympus",
  "skyline",
  "wasatch",
  "woodscross",
];

export default class Team {
  id: string;
  name: string;
  gender: string;
  combined: boolean;

  notCombined(): string {
    return this.name.replace("Boys Combined", "").replace("Girls Combined", "");
  }

  normalizeNameForURL(): string {
    let name = this.name
      .trim()
      .toLowerCase()
      .replaceAll(" ", "")
      .replace("boyscombined", "")
      .replace("girlscombined", "");

    if (CURRENT_ICONS.indexOf(name) >= 0) {
      return name;
    }

    return "waterpolo";
  }

  imageUrl() {
    return `/icons/${this.normalizeNameForURL()}.png`;
  }

  constructor(name: string, gender: string, combined: boolean) {
    this.name = name;
    this.gender = gender;
    this.combined = combined;
    this.id = `${name}:${gender}:${combined}`;
  }

  static items: { [key: string]: Team } = {};
  static getOrCreate(name: string, gender: string): Team {
    name = name.trim();
    let combined = false;
    if (name.toLowerCase().indexOf("combined") >= 1) {
      combined = true;
    }
    let team = new Team(name, gender, combined);
    if (Team.items[team.id]) {
      return Team.items[team.id];
    }

    Team.items[team.id] = team;

    return Team.items[team.id];
  }

  static toObject(team: Team) {
    return {
      id: team.id,
      name: team.name,
      gender: team.gender,
      combined: team.combined,
    };
  }

  static fromObject(data: any): Team {
    return Team.getOrCreate(data.name, data.gender);
  }
}
