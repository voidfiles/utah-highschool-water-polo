import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import data from "../public/data.json";
import Team from "../lib/models/Team";
import Site from "../lib/models/Site";
import Game from "../lib/models/Game";
import partitionGames from "../lib/utils/partitionGames";
import GameByWeek from "../components/GamesByWeek";
import Nav from "../components/Nav";

type MyProps = {
  siteData: any;
};

const Home: NextPage<MyProps> = ({ siteData }) => {
  const teams = siteData.teams.map((team: any) => {
    return Team.fromObject(team);
  });
  const sites = siteData.sites.map((site: any) => {
    return Site.fromObject(site);
  });
  const games = siteData.games.map((game: any) => {
    return Game.fromObject(game);
  });

  const gamesByWeek = partitionGames((game: Game) => {
    return game.datetime.format("WW");
  }, games);

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Utah High School Water Polo Schedule</title>
        <meta
          name="description"
          content="Utah High School Water Polo Schedule"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav teams={teams} selectedTeam={undefined}></Nav>
      {gamesByWeek.map((value: [string, Game[]], index: number) => {
        return GameByWeek(value, index);
      })}
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      siteData: data,
    }, // will be passed to the page component as props
  };
}

export default Home;
