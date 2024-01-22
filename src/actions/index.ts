import { Api, Player, Team } from "@/interfaces";
import axios from "axios";
import { NotificationFailure, NotificationPromise } from "../utils/tostify";

const server = "192.168.0.112";

export const getAllTeams = async (
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>
) => {
  try {
    const { data } = await axios.get(`http://${server}:3001/team`);

    if (data) setTeams(data);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure("An unknown error occurred", "top-right");
    }
  }
};

export const createTeam = async (
  teamData: Team,
  setTeams: (team: Team) => void
) => {
  const form = {
    name: teamData.name.trim(),
    logo: teamData.logo,
  };
  try {
    const promise = axios.post(`http://${server}:3001/team`, form);
    NotificationPromise(
      promise,
      "Loading football team data...",
      "Successfully created team!",
      "An error occurred while sending the data"
    );

    const { data } = await promise;
    if (data) setTeams(data);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure("An unknown error occurred", "top-right");
    }
  }
};

export const getTeamDetails = async (
  id: string,
  setTeamDetails: React.Dispatch<React.SetStateAction<Team>>
) => {
  try {
    const { data } = await axios.get(`http://${server}:3001/team/${id}`);

    if (data) setTeamDetails(data);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure(error.message, "top-right");
    }
  }
};

export const getPLayers = async (
  id: string,
  setTeamDetails: React.Dispatch<React.SetStateAction<Team>>
) => {
  try {
    const { data } = await axios.get(`http://${server}:3001/team/${id}`);

    if (data) setTeamDetails(data);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure(error.message, "top-right");
    }
  }
};

export const getAllSelectedTeams = async (
  id: string,
  setTeams: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const promise = axios.get(
      `https://apiv3.apifootball.com/?action=get_teams&league_id=${id}&APIkey=${process.env.NEXT_PUBLIC_API_KEY_FOOTBALL}`
    );

    NotificationPromise(
      promise,
      "Obtaining the soccer teams",
      "The soccer teams have been obtained correctly",
      "An error occurred while obtaining the data"
    );

    const { data } = await promise;

    const refactorData = data.map(
      (e: {
        team_key: string;
        team_name: string;
        team_badge: string;
        players: any[];
      }) => ({
        name: e?.team_name,
        image: e?.team_badge,
        id: e?.team_key,
        players: e.players,
      })
    );
    if (data) setTeams(refactorData);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure(error.message, "top-right");
    }
  }
};

export const getAllSelectedLeagues = async (
  id: string,
  setLeagues: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const promise = axios.get(
      `https://apiv3.apifootball.com/?action=get_leagues&country_id=${id}&APIkey=${process.env.NEXT_PUBLIC_API_KEY_FOOTBALL}`
    );

    NotificationPromise(
      promise,
      "Obtaining the leagues",
      "the leagues were successfully obtained",
      "An error occurred while obtaining the data"
    );

    const { data } = await promise;

    const refactorData = data.map(
      (e: { league_id: string; league_name: string; league_logo: string }) => ({
        name: e?.league_name,
        image: e?.league_logo,
        id: e?.league_id,
      })
    );
    if (data) setLeagues(refactorData);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure(error.message, "top-right");
    }
  }
};

export const getAllCountries = async (
  setCountries: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const { data } = await axios.get(
      `https://apiv3.apifootball.com/?action=get_countries&APIkey=${process.env.NEXT_PUBLIC_API_KEY_FOOTBALL}`
    );

    const refactorData = data
      .map(
        (e: {
          country_id: string;
          country_name: string;
          country_logo: string;
        }) => ({
          name: e?.country_name,
          image: e?.country_logo,
          id: e?.country_id,
        })
      )
      .filter(
        (e: Api) =>
          e.image.length && e.name !== "World" && e.name !== "World cup"
      );
    if (data) setCountries(refactorData);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure(error.message, "top-right");
    }
  }
};

export const addPlayerToTeam = async (
  id: string,
  setPlayersArr: (player: Player) => void,
  player: Player
) => {
  try {
    const promise = axios.post(`http://${server}:3001/player/${id}`, player);

    NotificationPromise(
      promise,
      "Adding player to the team",
      "Player was successfully added to the team",
      "An error occurred while sending data"
    );
    const { data } = await promise;
    if (data) setPlayersArr(data);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure(error.message, "top-right");
    }
  }
};

export const deletePlayer = async (
  player: string,
  setPlayersArr: (player: string) => void,
  currentTeam: string
) => {
  try {
    const promise = axios.delete(
      `http://${server}:3001/player/${player}/${currentTeam}`
    );

    NotificationPromise(
      promise,
      "Deleting player to the team",
      "Player was successfully deleted to the team",
      "An error occurred while sending data"
    );
    const { data } = await promise;
    if (data) setPlayersArr(player);
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure(error.message, "top-right");
    }
  }
};

export const deleteTeam = async (
  id: string,
  setTeamsArr: React.Dispatch<React.SetStateAction<Team[]>>
) => {
  try {
    const promise = axios.delete(`http://${server}:3001/team/${id}`);
    NotificationPromise(
      promise,
      "Deleting team to the team",
      "Team was successfully deleted to the team",
      "An error occurred while sending data"
    );
    const { data } = await promise;
    if (data)
      setTeamsArr((prev: Team[]) => prev.filter((e: Team) => e._id !== id));
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure(error.message, "top-right");
    }
  }
};

export const updateNameTeam = async (
  newName: string,
  currentTeam: string,
  setTeamDetails: React.Dispatch<React.SetStateAction<Team>>
) => {
  try {
    const promise = axios.put(`http://${server}:3001/team/${currentTeam}`, {
      name: newName,
    });

    NotificationPromise(
      promise,
      "Updating team...",
      "Team was successfully updated",
      "An error occurred while sending data"
    );
    const { data } = await promise;
    if (data) setTeamDetails((prev) => ({ ...prev, name: newName }));
  } catch (error: any) {
    console.error(error);
    if (error?.response?.data?.message) {
      NotificationFailure(error?.response?.data?.message, "top-right");
    } else {
      NotificationFailure(error.message, "top-right");
    }
  }
};
