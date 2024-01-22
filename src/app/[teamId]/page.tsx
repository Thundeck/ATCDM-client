"use client";

import { getTeamDetails, updateNameTeam } from "@/actions";
import Modal from "@/components/modal";
import SearchPlayer from "@/components/searchPlayer";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Check, Edit2, Plus, X } from "react-feather";
import Court from "../../../public/football-team-bench-svgrepo-com.svg";
import atcLogo from "../../../public/logo-atc.svg";
import Stadium from "../../../public/stadium.jpeg";
import { Player, Team } from "../../interfaces";
import CardContainer from "@/components/cardContainer";
import InputGoogle from "@/components/inputGoogle";

const initialState: Team = {
  name: "",
  logo: "",
  players: [],
};

const TeamDetails = () => {
  const { teamId } = useParams();
  const [teamDetails, setTeamDetails] = useState<Team>(initialState);
  console.log(teamDetails);
  const { isOpen, modalOpen, modalClose } = useModal(false);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    getTeamDetails(teamId.toString(), setTeamDetails);
  }, []);

  const handlePlayers = (player: Player) => {
    if (player && teamDetails?.players) {
      setTeamDetails({
        ...teamDetails,
        players: [...teamDetails?.players, player],
      });
    }
  };

  const hadleCancel = () => {
    setInput("");
    setEdit(false);
  };

  const handleDeletePlayers = (id: string) => {
    if (id && teamDetails?.players) {
      const filteredArr = teamDetails.players.filter((e) => e.player_id !== id);
      setTeamDetails({
        ...teamDetails,
        players: filteredArr,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleChangeName = () => {
    if (input.length && teamDetails._id) {
      updateNameTeam(input, teamDetails._id, setTeamDetails);
      setEdit(false);
    }
  };

  return (
    <main
      className="flex justify-center items-center min-h-screen bg-cover bg-center  py-10"
      style={{
        backgroundImage: `url(${Stadium.src})`,
      }}
    >
      <div className="bg-white p-5 rounded-lg min-w-[80%] max-w-[90%] lg:min-w-[40%] flex flex-col gap-3">
        <section className="flex flex-row justify-end items-center gap-1 h-fit ">
          <Image
            className="max-w-14 max-h-14 lg:max-h-20 lg:max-w-20 "
            src={atcLogo}
            alt="atc-dream-match"
          />{" "}
          <h1 className="text-xl font-play text-black">Dream Match</h1>
        </section>
        <section className="flex flex-row justify-start gap-2 items-center h-fit shadow-md rounded-lg p-1">
          <img
            className="max-w-28 lg:max-w-36 rounded-lg shadow-md"
            src={teamDetails?.logo}
            alt={teamDetails?.name}
          />
          {!edit ? (
            <div className="flex flex-row justify-center items-center gap-2">
              <h1 className="text-3xl lg:text-4xl font-play text-black">
                {teamDetails?.name}
              </h1>
              <button
                onClick={() => setEdit(true)}
                className="max-h-8 bg-green-600 rounded-full active:bg-green-500 lg:hover:bg-green-500 p-1"
              >
                <Edit2 />
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              <InputGoogle
                handleChange={handleChange}
                type="text"
                value={input}
              >
                New name
              </InputGoogle>
              <button
                onClick={() => hadleCancel()}
                className="bg-green-600 rounded-full p-1"
              >
                <X />
              </button>
              <button
                onClick={() => handleChangeName()}
                className="bg-green-600 rounded-full p-1"
              >
                <Check />
              </button>
            </div>
          )}
        </section>
        {teamDetails?.players?.length && teamDetails?._id ? (
          <div className="flex flex-col gap-3">
            {teamDetails.players.length <= 5 &&
              teamDetails.players.length >= 1 && (
                <div className="bg-green-600 flex rounded-lg justify-between px-3 items-center flex-row py-1 font-semibold">
                  <p>incomplete team, add player</p>
                  <Plus
                    className="bg-white rounded-full cursor-pointer text-green-600 active:bg-green-600 active:text-white lg:hover:bg-green-600 lg:hover:text-white duration-300"
                    onClick={modalOpen}
                  />
                </div>
              )}
            <CardContainer
              players={teamDetails?.players}
              setPlayersArr={handleDeletePlayers}
              currentTeam={teamDetails?._id}
            />
          </div>
        ) : (
          <section className="flex justify-center items-center flex-col py-1">
            <p className="text-lg text-green-600">
              Is your player bench still empty?
            </p>
            <Image
              className="max-w-64 lg:max-h-72"
              src={Court}
              alt="empty-court"
            />
            <button
              onClick={modalOpen}
              className=" bg-green-600 py-2 px-4 font-play rounded-lg text-2xl active:bg-green-500 lg:hover:bg-green-500 shadow-lg shadow-gray-400 "
            >
              Add player
            </button>
          </section>
        )}
        <Modal isOpen={isOpen} modalClose={modalClose}>
          <SearchPlayer
            currentTeam={teamDetails?._id}
            setPlayersArr={handlePlayers}
          />
        </Modal>
      </div>
    </main>
  );
};

export default TeamDetails;
