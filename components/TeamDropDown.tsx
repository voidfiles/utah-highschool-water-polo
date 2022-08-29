import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Team from "../lib/models/Team";
import Image from "next/image";
import Link from "next/link";

const IGNORE_TEAM_NAMES = [
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
];

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

interface TeamDropdownInput {
  label: string;
  teams: Array<Team>;
  filter: (value: any, index: number, array: any[]) => unknown;
}

const TeamDropdown = ({ label, teams, filter }: TeamDropdownInput) => {
  let filteredTeams = teams
    .filter(filter)
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .filter((t: Team) => {
      if (IGNORE_TEAM_NAMES.indexOf(t.name) >= 0) {
        return false;
      }

      return true;
    });

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {label}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left z-10 absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {filteredTeams.map((team) => {
              return (
                <Menu.Item key={team.id}>
                  {({ active }) => (
                    <Link href={`/team/${team.id}/`}>
                      <a
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        <Image
                          src={team.imageUrl()}
                          alt="icon"
                          layout="fixed"
                          width={12}
                          height={12}
                          className="pr-2"
                        ></Image>
                        <span className="pl-2">{team.name}</span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TeamDropdown;
