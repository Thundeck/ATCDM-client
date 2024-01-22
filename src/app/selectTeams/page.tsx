"use client";
import { getAllTeams } from "@/actions";
import { Team } from "@/interfaces";
import { NotificationWarning } from "@/utils/tostify";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronUp, Home } from "react-feather";
import Stadium from "../../../public/stadium.jpeg";
import Link from "next/link";

const CardListItem = ({
  Team,
  hadleSetTeam,
}: {
  Team: Team;
  hadleSetTeam: (
    t: Team,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      onClick={() => setIsOpen(!isOpen)}
      className="flex flex-col justify-start items-end gap-3 px-4 py-1 shadow-md shadow-gray-400 rounded-lg cursor-default"
      key={Team?._id}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex justify-start items-center flex-row gap-3">
          <img
            src={Team?.logo}
            alt={Team?.name}
            className="max-w-20 lg:max-w-24 rounded-full drop-shadow-lg "
          />
          <p className="text-xl font-play max-w-40">{Team?.name}</p>
        </div>
        <ChevronUp
          className={`text-white w-6 h-6 bg-green-600 rounded-full ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <ul
        className={`w-full transition-all duration-300 ease-in-out overflow-hidden shadow-inner shadow-gray-400 p-1 rounded-lg min-h-44  ${
          isOpen ? "flex flex-col" : " hidden"
        }`}
      >
        {Team.players?.map((p) => (
          <li className="flex flex-row justify-center items-center shadow-sm shadow-gray-400 w-full rounded-lg gap-2 h-fit py-1">
            <img
              className="max-h-12 max-w-12 rounded-full "
              src={p.player_image}
            />
            <div className="font-play">
              <p className="text-lg flex gap-1.5">
                {p.player_name}
                <span className="text-black">{p.player_number}</span>
              </p>
              <p className="text-sm">{p.player_type}</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={(e) => hadleSetTeam(Team, e)}
        className="bg-green-600 text-white font-play text-2xl px-4 rounded-md"
      >
        select
      </button>
    </li>
  );
};

const SelectTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [homeTeam, setHomeTeam] = useState<Team | null>(null);
  const [visitorTeam, setVisitorTeam] = useState<Team | null>(null);

  useEffect(() => {
    getAllTeams(setTeams);
  }, []);

  const hadleSetHomeTeam = (
    t: Team,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    t.players && t.players?.length >= 5
      ? setHomeTeam(t)
      : NotificationWarning(
          "the team must have 5 players to be able to play",
          "top-right"
        );
  };

  const hadleSetVisitorTeam = (
    t: Team,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    t.players && t.players?.length >= 5
      ? setVisitorTeam(t)
      : NotificationWarning(
          "the team must have 5 players to be able to play",
          "top-right"
        );
  };

  return (
    <main
      className="flex flex-col justify-center gap-2 items-center min-h-screen bg-cover bg-center pt-20 lg:pt-10 p-10"
      style={{
        backgroundImage: `url(${Stadium.src})`,
      }}
    >
      <Link
        href={"/home"}
        className="absolute top-5 left-10 p-3 bg-white rounded-full active:bg-gray-300 lg:hover:bg-gray-300"
      >
        <Home className=" text-green-600" />
      </Link>
      <h1 className="font-play text-4xl text-center">
        Make your dream match a reality
      </h1>
      <div className="flex flex-col justify-center items-center lg:flex-row gap-10 ">
        {!homeTeam ? (
          <div className="bg-white rounded-lg text-green-600 flex flex-col justify-center items-center p-3">
            <h1 className="font-play text-4xl">Select home team</h1>
            <ul className=" shadow-inner shadow-gray-400 rounded-lg overflow-auto p-1 min-h-96 max-h-96 min-w-80 max-w-80 lg:min-w-96">
              {teams.length >= 4 ? (
                teams
                  .filter((t) => t._id !== visitorTeam?._id)
                  .map((t) => (
                    <CardListItem Team={t} hadleSetTeam={hadleSetHomeTeam} />
                  ))
              ) : (
                <div className="min-h-80 w-full flex justify-center items-center font-play text-2xl">
                  no teams
                </div>
              )}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg text-green-600 flex flex-col justify-center items-start gap-3 p-3 relative">
            <ArrowLeft onClick={() => setHomeTeam(null)} className=" h-8 w-8" />
            <h1 className="font-play text-4xl w-full text-center">Home Team</h1>
            <div className="flex flex-row gap-3 justify-start w-full items-center">
              <img
                className="max-h-20 max-w-20 rounded-full"
                src={homeTeam.logo}
              />
              <p className="font-play text-2xl">{homeTeam.name}</p>
            </div>
            <ul className="shadow-inner shadow-gray-400 rounded-lg overflow-auto p-1 min-h-80 max-h-80 min-w-80 max-w-80 lg:min-w-96">
              {homeTeam.players?.map((p) => (
                <li className="flex flex-row justify-center items-center shadow-sm shadow-gray-400 w-full rounded-lg gap-2 h-fit py-1">
                  <img
                    className="max-h-12 max-w-12 rounded-full "
                    src={p.player_image}
                  />
                  <div className="font-play">
                    <p className="text-lg flex gap-1.5">
                      {p.player_name}
                      <span className="text-black">{p.player_number}</span>
                    </p>
                    <p className="text-sm">{p.player_type}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className=" lg:min-h-96 flex justify-center items-center flex-col ">
          <h2 className="font-play text-9xl">VS</h2>
          {homeTeam && visitorTeam && (
            <Link
              className="bg-green-600 px-4 py-1 font-play text-3xl rounded-md"
              href={`match/${homeTeam._id}-${visitorTeam._id}`}
            >
              MATCH!
            </Link>
          )}
        </div>
        {!visitorTeam ? (
          <div className="bg-white rounded-lg text-green-600 flex flex-col justify-center items-center p-3">
            <h1 className="font-play text-4xl">Select visitor team</h1>
            <ul className="shadow-inner shadow-gray-400 rounded-lg overflow-auto p-1 min-h-96 max-h-96 min-w-80 max-w-80 lg:min-w-96">
              {teams.length >= 1 ? (
                teams
                  .filter((t) => t._id !== homeTeam?._id)
                  .map((t) => (
                    <CardListItem Team={t} hadleSetTeam={hadleSetVisitorTeam} />
                  ))
              ) : (
                <div className="">no teams</div>
              )}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg text-green-600 flex flex-col justify-center items-start gap-3 p-3 relative">
            <ArrowLeft
              onClick={() => setVisitorTeam(null)}
              className="cursor-pointer h-8 w-8"
            />
            <h1 className="font-play text-4xl w-full text-center">
              Visitor Team
            </h1>
            <div className="flex flex-row gap-3 justify-start w-full items-center">
              <img
                className="max-h-20 max-w-20 rounded-full"
                src={visitorTeam.logo}
              />
              <p className="font-play text-2xl">{visitorTeam.name}</p>
            </div>
            <ul className="shadow-inner shadow-gray-400 rounded-lg overflow-auto p-1 min-h-80 max-h-80 min-w-80 max-w-80 lg:min-w-96">
              {visitorTeam.players?.map((p) => (
                <li className="flex flex-row justify-center items-center shadow-sm shadow-gray-400 w-full rounded-lg gap-2 h-fit py-1">
                  <img
                    className="max-h-12 max-w-12 rounded-full "
                    src={p.player_image}
                  />
                  <div className="font-play">
                    <p className="text-lg flex gap-1.5">
                      {p.player_name}
                      <span className="text-black">{p.player_number}</span>
                    </p>
                    <p className="text-sm">{p.player_type}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default SelectTeams;
