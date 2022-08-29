import moment from "moment";
import Team from "../lib/models/Team";
import Game from "../lib/models/Game";
import Site from "../lib/models/Site";
import Division, { normalizeDivision } from "../lib/models/Division";

let fs = require("fs");
let { parse } = require("csv-parse");
let momentAct = require("moment");

let getRows = (fname: string): Promise<Array<Array<string>>> => {
  return new Promise((resolve, reject) => {
    let rows: Array<Array<string>> = [];

    fs.createReadStream(fname)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row: Array<string>) {
        rows.push(row);
      })
      .on("end", function () {
        resolve(rows);
      })
      .on("error", function (error: any) {
        console.log(error.message);
        reject(error);
      });
  });
};

const DATA_TO_FETCH = [
  ["entries", "494485403"],
  ["structure", "933617404"],
  ["rules", "164928778"],
  ["standings", "1050661320"],
  ["sites", "160172473"],
  ["schedule", "1535323947"],
];

const normalizeSiteName = (name: string): string => {
  if (name == "Skyline") {
    return "Skyline HS";
  }

  if (name == "Murray Rec") {
    return "Murray Recreation Center";
  }

  if (name == "KOPFC" || name == "KOPFC Course 1" || name == "KOPFC Course 2") {
    return "Kearns Oquirrh Park Fitness Center (KOPFC)";
  }

  if (name == "Ecker MS") {
    return "Ecker Hills MS";
  }

  if (
    name == "Logan Aquatic Center - Course 1" ||
    name == "Logan Aquatic Center - Course 2"
  ) {
    return "Logan Aquatic Center";
  }

  if (name == "CHRC") {
    return "Cottonwood Heights Rec Center (CHRC)";
  }

  return name;
};

type StringedArrays = {
  [key: string]: Array<Array<string>>;
};

// 0 Day/Date:,
// 1 TUE: August 23rd,
// 2 Host:,
// 3 Olympus,
// 4 Location:,
// 5 Olympus HS,,
// Day/Date:,
// SAT: October 1st,
// Host:,
// Kearns,Location:,KOPFC Course 1,,
class DayDate {
  rawDay: string;
  day: moment.Moment;
  host: string;
  site: Site;

  constructor(rawDay: string, day: moment.Moment, host: string, site: Site) {
    this.rawDay = rawDay;
    this.day = day;
    this.host = host;
    this.site = site;
  }
}

const parseDayDateRow = (row: Array<string>): DayDate => {
  let site = Site.items[normalizeSiteName(row[5])];
  if (!site) {
    throw `${row[5]} not in list of sites ${Object.keys(Site.items).join(
      ", "
    )}`;
  }
  let dt = momentAct(row[1], "ddd: MMMM Do");

  return new DayDate(row[1], dt, row[3], site);
};

const normalizeTeamName = (name: string): string => {
  if (name == "Kearns HS") {
    return "Kearns";
  }

  if (name == "Woods Cross Boys") {
    return "Woods Cross";
  }

  if (name == "Host:") {
    throw "what the hell!";
  }
  return name;
};

const IGNORE_TEAM_NAMES = [
  [
    "1st Combined Boys",
    "1st Combined Girls",
    "2nd Combined Boys",
    "2nd Combined Girls",
    "3rd Combined Boys",
    "3rd Combined Girls",
    "4th Combined Boys",
    "4th Combined Girls",
    "Loser Game 1",
    "Loser Game 1",
    "Loser Game 2",
    "Loser Game 2",
    "Winner Game 1",
    "Winner Game 1",
    "Winner Game 2",
    "Winner Game 2",
  ],
];

// 0 HS Boys 1,
// 1 6:45 PM,
// 2 Woods Cross, # visitor
// 3 Olympus, # home
// 4 5A,
// 5 10-19,
// 6 7 min Quarters
const parseGameRow = (dayDate: DayDate, row: Array<string>): Game => {
  let gameNum = row[0];
  let gender;
  if (gameNum.toLowerCase().indexOf("boys") >= 0) {
    gender = "boys";
  } else {
    gender = "girls";
  }
  let hour = moment(row[1], ["h:m a", "H:m"]);
  let date = dayDate.day
    .clone()
    .set("hours", hour.hours())
    .set("minutes", hour.minutes());
  let visitor = Team.getOrCreate(normalizeTeamName(row[2]), gender);
  let home = Team.getOrCreate(normalizeTeamName(row[3]), gender);
  let divisions = row[4].split("/").map((D): Division => {
    return normalizeDivision(D);
  });
  let score = row[5];
  let note = row[6];

  return new Game(
    dayDate.site,
    home,
    visitor,
    date,
    gameNum,
    divisions,
    note,
    score
  );
};

(async () => {
  const fetchedData: StringedArrays = {};

  for (let index = 0; index < DATA_TO_FETCH.length; index++) {
    const element = DATA_TO_FETCH[index];
    fetchedData[element[0]] = await getRows(`./scratch/${element[1]}.csv`);
  }
  fetchedData["sites"].forEach((value) => {
    if (value[0] == "Pool Site") {
      return;
    }
    Site.getOrCreate(value[0], value[1], value[2]);
  });
  Site.getOrCreate("OGDEN", "", "");
  var dayDate: DayDate | undefined;
  var teamNames: Array<string> = [];
  var games: Array<Game> = [];
  fetchedData["schedule"].forEach((row) => {
    if (row[0] == "") {
      dayDate = undefined;
      return;
    }
    if (row[0].substring(0, 3) == "WEEK") {
      return;
    }

    if (row[0] == "Day/Date:") {
      dayDate = parseDayDateRow(row);
      return;
    }

    if (row[0] == "Game #") {
      return;
    }

    if (dayDate) {
      let game = parseGameRow(dayDate, row);
      games.push(game);
    }
  });
  const siteData = {
    games: games.map((game: Game) => {
      return Game.toObject(game);
    }),
    teams: Object.values(Team.items).map((team: Team) => {
      return Team.toObject(team);
    }),
    sites: Object.values(Site.items).map((site: Site) => {
      return Site.toObject(site);
    }),
  };
  fs.writeFileSync("./public/data.json", JSON.stringify(siteData));
})();

export {};
