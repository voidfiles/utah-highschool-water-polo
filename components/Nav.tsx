import TeamDropdown from "./TeamDropDown";
import Team from "../lib/models/Team";

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
