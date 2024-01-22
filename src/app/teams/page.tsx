"use client";

import Image from "next/image";
import atcLogo from "../../../public/logo-atc.svg";
import Stadium from "../../../public/stadium.jpeg";
import { Home, Plus, X } from "react-feather";
import { useModal } from "../../hooks/useModal";
import Modal from "@/components/modal";
import CreateTeam from "@/components/createTeam";
import { useEffect, useState } from "react";
import { deleteTeam, getAllTeams } from "@/actions";
import { Team } from "@/interfaces";
import noTeams from "../../../public/football-team-flatline.svg";
import Link from "next/link";

const Teams = () => {
  const { isOpen, modalOpen, modalClose } = useModal(false);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getAllTeams(setTeams);
  }, []);

  const hadleSetTeams = (team: Team) => {
    if (team) {
      setTeams([...teams, team]);
    }
  };

  const handleDeleteTeam = (
    id: string,
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (id) {
      deleteTeam(id, setTeams);
    }
  };

  return (
    <main
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-10 lg:px-0"
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
      <div className="bg-white text-black p-10 lg:p-5 rounded-lg min-w-[100%] lg:min-w-[40%] flex flex-col gap-5">
        <section className="flex flex-col lg:flex-row justify-center items-center gap-4 h-fit">
          <Image height={100} width={100} src={atcLogo} alt="atc-dream-match" />{" "}
          <h1 className="text-4xl font-play ">Dream Match</h1>
        </section>
        <section className="flex flex-col">
          <h2 className="w-full text-xl lg:text-2xl flex justify-between pb-1 text-green-500 font-bold border-b border-green-500">
            Teams
            <Plus
              onClick={(e) => modalOpen(e)}
              className=" text-green-500 lg:hover:bg-gray-200 active:bg-gray-200 rounded-full"
              height={30}
              width={30}
            />
          </h2>

          {teams.length ? (
            <ul className="flex flex-col gap-2 shadow-inner shadow-gray-400 rounded-lg p-1 mt-3">
              {teams?.map((e) => (
                <div className="flex justify-between gap-3 px-4 items-center py-1 lg:hover:bg-gray-200 shadow-sm shadow-gray-400 rounded-lg">
                  <Link
                    className="flex justify-start gap-3 px-4 items-center"
                    href={`/${e?._id}`}
                    key={e?._id}
                  >
                    <img
                      src={e?.logo}
                      alt={e?.name}
                      className="max-w-20 lg:max-w-24 rounded-full drop-shadow-lg "
                    />
                    <p className="text-2xl font-play">{e?.name}</p>
                  </Link>
                  <X
                    onClick={(event) =>
                      e?._id && handleDeleteTeam(e?._id, event)
                    }
                    className="cursor-pointer text-white bg-green-600 active:bg-green-700 lg:hover:bg-green-700 rounded-full shadow-md shadow-gray-400"
                  />
                </div>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col py-3 lg:py-1 gap-5 lg:gap-1">
              <p className="text-green-600 text-xl font-semibold">
                No teams created
              </p>
              <Image src={noTeams} alt="no-teams" />
              <p className="text-green-600 text-xl font-semibold">
                create the team for your
              </p>
              <button
                onClick={(e) => modalOpen(e)}
                className="font-play text-white bg-green-600 py-2 px-4 text-4xl rounded-lg shadow-lg shadow-gray-400 active:bg-green-500 lg:hover:bg-green-500"
              >
                dream match
              </button>
            </div>
          )}
          <Modal modalClose={modalClose} isOpen={isOpen}>
            <CreateTeam setTeams={hadleSetTeams} />
          </Modal>
        </section>
      </div>
    </main>
  );
};

export default Teams;
