import TeamDropdown from "./TeamDropDown";
import Team from "../lib/models/Team";
import Link from "next/link";

const chooseText = (def: string, alt: Team | undefined): string => {
  if (alt) {
    return "Game Schdule for " + alt.name;
  }

  return def;
};

interface NavType {
  teams: Array<Team>;
  selectedTeam: Team | undefined;
}

const Nav = ({ teams, selectedTeam }: NavType) => {
  const boysFilter = (team: Team) => {
    return team.gender == "boys";
  };

  const girlsFilter = (team: Team) => {
    return team.gender == "girls";
  };

  return (
    <div className="bg-white py-5 border-b border-gray-200">
      <h1 className="text-2xl font-medium text-gray-900">
        {chooseText("Utah High School Water Polo Schedule", selectedTeam)}
      </h1>
      <Link href={`/`}>
        <div className="relative inline-block text-left">
          <a className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Home
          </a>
        </div>
      </Link>
      <TeamDropdown
        label="Boys Teams"
        teams={teams}
        filter={boysFilter}
      ></TeamDropdown>
      <TeamDropdown
        label="Girls Teams"
        teams={teams}
        filter={girlsFilter}
      ></TeamDropdown>
    </div>
  );
};

export default Nav;
