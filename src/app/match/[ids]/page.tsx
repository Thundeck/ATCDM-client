"use client";
import { getTeamDetails } from "@/actions";
import Counter from "@/components/counter";
import { Team, Ball, Score, TeamSummary, matchSummary } from "@/interfaces";
import { useParams } from "next/navigation";
import Stadium from "../../../../public/stadium.jpeg";

import { useEffect, useRef, useState } from "react";

interface Match {
  teams: string[];
  marker: Record<string, number>;
  fouls: Record<string, number>;
  corners: Record<string, number>;
  scorer: Record<string, Score[]>;
  ball: Ball;
  [key: string]: any;
  foul(team: string): void;
  gol(team: string, gol: string): void;
  ballOut(type: string, team: string): void;
  randomEvent(): void;
}

interface LiveMatchSummary {
  match: Match;
  getSummary(): {
    firstTeamSummary: TeamSummary;
    secondTeamSummary: TeamSummary;
  };
}

class Match implements Match {
  constructor() {
    this.teams = ["Team1", "Team2"];
    this.marker = { Team1: 0, Team2: 0 };
    this.scorer = { Team1: [], Team2: [] };
    this.corners = { Team1: 0, Team2: 0 };
    this.fouls = { Team1: 0, Team2: 0 };
    this.ball = { position: "center", team: null };
  }

  foul(team: string) {
    this.fouls[team]++;
    this.ball.position = "foul";
    this.ball.team = this.teams.filter((e) => e !== team)[0];
  }

  gol(team: string, counter: string) {
    const num = Math.floor(Math.random() * 5);
    this.marker[team]++;
    this.scorer[team].push({ playerPosition: num, time: counter, team });
    this.ball.position = "center";
    this.ball.team = null;
  }

  ballOut(type: string, team: string) {
    if (type === "side") {
      this.ball.position = "side";
      this.ball.team = this.teams.filter((e) => e !== team)[0];
    } else if (type === "goal") {
      this.corners[team]++;
      this.ball.position = "corner";
      this.ball.team = this.teams.filter((e) => e !== team)[0];
    }
  }

  randomEvent(time?: string) {
    const events = ["foul", "gol", "ballOut"];
    const teams = this.teams;
    const event = events[Math.floor(Math.random() * events.length)];
    const team = teams[Math.floor(Math.random() * teams.length)];

    if (event === "ballOut") {
      const types = ["side", "goal"];
      const type = types[Math.floor(Math.random() * types.length)];
      this[event](type, team);
    } else if (event === "gol" && time) {
      this[event](team, time);
    } else {
      this[event](team);
    }
  }
}

class LiveMatchSummary {
  constructor(match: Match) {
    this.match = match;
  }

  getSummary() {
    let firstTeamSummary = {
      team: this.match.teams[0],
      marker: this.match.marker[this.match.teams[0]],
      fouls: this.match.fouls[this.match.teams[0]],
      corners: this.match.corners[this.match.teams[0]],
      scorer: this.match.scorer[this.match.teams[0]],
    };

    let secondTeamSummary = {
      team: this.match.teams[1],
      marker: this.match.marker[this.match.teams[1]],
      fouls: this.match.fouls[this.match.teams[1]],
      corners: this.match.corners[this.match.teams[1]],
      scorer: this.match.scorer[this.match.teams[1]],
    };

    return { firstTeamSummary, secondTeamSummary };
  }
}

const initialState: Team = {
  name: "",
  logo: "",
  players: [],
};

const initialStateTeamSummary: TeamSummary = {
  team: "",
  marker: 0,
  fouls: 0,
  corners: 0,
  scorer: [],
};

const MatchComponent = () => {
  const router = useParams();
  const [homeId, visitorId] = router.ids.toString().split("-");
  const [homeDetails, setHomeDetails] = useState<Team>(initialState);
  const [visitorDetails, setVisitorDetails] = useState<Team>(initialState);
  const [route, setRoute] = useState<boolean>(true);

  const [matchSummary, setMatchSummary] = useState<matchSummary>({
    firstTeamSummary: initialStateTeamSummary,
    secondTeamSummary: initialStateTeamSummary,
  });
  let matchDuration = 6 * 60 * 1000;
  const [counter, setCounter] = useState("00:00");
  const minEventInterval = 5000;
  const maxEventInterval = 30000;

  const counterRef = useRef(counter);

  useEffect(() => {
    counterRef.current = counter;
  }, [counter]);

  const startMatch = () => {
    let match = new Match();
    let liveMatchSummary = new LiveMatchSummary(match);
    let matchStartTime = Date.now();

    const updateSummary = () => {
      setMatchSummary(liveMatchSummary.getSummary());
    };

    const simulateMatch = () => {
      if (Date.now() - matchStartTime >= 6 * 60 * 1000) {
        return;
      }

      match.randomEvent(counterRef.current);
      updateSummary();

      let nextEventInterval =
        Math.random() * (maxEventInterval - minEventInterval) +
        minEventInterval;
      if (nextEventInterval < matchDuration) {
        setTimeout(simulateMatch, nextEventInterval);
        matchDuration -= nextEventInterval;
      }
    };

    simulateMatch();
  };

  useEffect(() => {
    getTeamDetails(homeId, setHomeDetails);
    getTeamDetails(visitorId, setVisitorDetails);
  }, []);

  const golArr = [
    ...matchSummary.firstTeamSummary.scorer,
    ...matchSummary.secondTeamSummary.scorer,
  ].sort((a, b) => {
    return b.time.localeCompare(a.time);
  });

  return (
    <main
      className="flex flex-col justify-center gap-2 items-center min-h-screen bg-cover bg-center p-5"
      style={{
        backgroundImage: `url(${Stadium.src})`,
      }}
    >
      <div className=" w-full flex justify-center items-center flex-col rounded-lg overflow-hidden lg:max-w-[70%] bg-white">
        <section className="bg-green-600 flex justify-center items-center flex-col gap-2 p-4 w-full">
          <div className="flex justify-center items-center flex-row w-full gap-5 lg:gap-10">
            <div className="flex justify-center items-center flex-col gap-1 lg:gap-3">
              <img
                className="max-w-20 max-h-20 lg:max-w-40 lg:max-h-40 rounded-full"
                src={homeDetails.logo}
              />
              <p className="font-play lg:text-xl">{homeDetails.name}</p>
            </div>
            <div className="h-full flex justify-center items-center flex-col gap-3">
              <p className="font-play text-6xl">
                {matchSummary.firstTeamSummary.marker}:
                {matchSummary.secondTeamSummary.marker}
              </p>
              <Counter startGame={startMatch} setTime={setCounter} />
            </div>
            <div className="flex justify-center items-center flex-col gap-1 lg:gap-3">
              <img
                className="max-w-20 max-h-20 lg:max-w-40 lg:max-h-40 rounded-full"
                src={visitorDetails.logo}
              />
              <p className="font-play lg:text-xl">{visitorDetails.name}</p>
            </div>
          </div>
          <p className="text-xs text-center text-green-400">
            once the match has started, it will not stop until 60:00 (60min into
            the simulation, 8min real) has elapsed.
          </p>
        </section>
        <section className="flex justify-center items-center flex-col gap-2 p-4 w-full">
          <nav className="text-green-600 flex justify-start items-center flex-row w-full border-b border-green-600">
            <p
              onClick={() => setRoute(true)}
              className={`px-0.5 ${
                route ? "border-b-2 border-green-600 font-semibold" : ""
              }`}
            >
              Match statistics
            </p>
            <p
              onClick={() => setRoute(false)}
              className={`px-0.5 ${
                !route ? "border-b-2 border-green-600 font-semibold" : ""
              }`}
            >
              Players
            </p>
          </nav>
          {route && (
            <div className="text-green-600 w-full gap-3 rounded-lg p-1 shadow-inner shadow-gray-400">
              <div className="w-full flex justify-between items-center flex-row shadow-md shadow-gray-400  rounded-lg py-2 px-4">
                <p
                  className={`${
                    matchSummary.firstTeamSummary.corners >
                    matchSummary.secondTeamSummary.corners
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {matchSummary.firstTeamSummary.corners}
                </p>
                <p className="font-semibold">corner kick</p>
                <p
                  className={`${
                    matchSummary.firstTeamSummary.corners <
                    matchSummary.secondTeamSummary.corners
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {matchSummary.secondTeamSummary.corners}
                </p>
              </div>
              <div className="w-full flex justify-between items-center flex-row shadow-md shadow-gray-400  rounded-lg py-2 px-4">
                <p
                  className={`${
                    matchSummary.firstTeamSummary.fouls >
                    matchSummary.secondTeamSummary.fouls
                      ? "font-semibold"
                      : ""
                  }`}
                >
                  {matchSummary.firstTeamSummary.fouls}
                </p>
                <p className="font-semibold">fouls</p>
                <p
                  className={`${
                    matchSummary.firstTeamSummary.fouls <
                    matchSummary.secondTeamSummary.fouls
                      ? "font-semibold"
                      : ""
                  }`}
                >
                  {matchSummary.secondTeamSummary.fouls}
                </p>
              </div>
              <div className="w-full flex justify-start items-start flex-col shadow-md shadow-gray-400  rounded-lg py-2 px-4 min-h-40 max-h-40 overflow-auto">
                <p className="border-b-2 border-green-600 w-full font-bold">
                  goals
                </p>
                {golArr.map((s) => (
                  <div className="flex justify-between items-center w-full gap-20">
                    <p
                      className={`text-green-600 ${
                        s.team === "Team1" ? "font-semibold" : ""
                      }`}
                    >
                      {s.team === "Team1" && homeDetails.players
                        ? homeDetails.players[s.playerPosition].player_name
                        : "none"}
                    </p>
                    <p className="font-semibold">{s.time}</p>
                    <p
                      className={`text-green-600 ${
                        s.team === "Team2" ? "font-semibold" : ""
                      }`}
                    >
                      {s.team === "Team2" && visitorDetails.players
                        ? visitorDetails.players[s.playerPosition].player_name
                        : "none"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!route && (
            <div className="text-green-600 w-full flex justify-center items-center flex-row gap-1 lg:gap-5">
              <div className="w-full flex justify-center items-center flex-col">
                <p className="font-play text-xl">home team</p>
                <ul className="rounded-lg text-green-600 font-play text-2xl min-h-60 max-h-60 lg:min-h-48 lg:max-h-48 overflow-auto flex justify-start items-start flex-col w-full gap-1 p-1 shadow-inner shadow-gray-400">
                  {homeDetails.players?.map((p) => (
                    <li
                      key={p?.player_id}
                      className="flex justify-between items-center flex-row w-full gap-2 py-1 bg-white rounded-lg px-5 shadow-sm shadow-gray-400"
                    >
                      <div className=" flex flex-row justify-center items-center">
                        <img
                          className="max-w-10 max-h-10 lg:max-h-16 lg:max-w-16 lg:min-w-16 rounded-full"
                          src={p?.player_image}
                        />
                        <div className="flex flex-col">
                          <p className="text-xl flex justify-start items-center flex-row ">
                            {p.player_name}
                            <span className="text-gray-700">
                              {p.player_number}
                            </span>
                          </p>
                          <p className="text-sm">{p.player_type}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full flex justify-center items-center flex-col">
                <p className="font-play text-xl">visitor team</p>
                <ul className="rounded-lg text-green-600 font-play text-2xl min-h-60 max-h-60 lg:min-h-48 lg:max-h-48 overflow-auto flex justify-start items-start flex-col w-full gap-1 p-1 shadow-inner shadow-gray-400">
                  {visitorDetails.players?.map((p) => (
                    <li
                      key={p?.player_id}
                      className="flex justify-between items-center flex-row w-full gap-2 py-1 bg-white rounded-lg px-5 shadow-sm shadow-gray-400"
                    >
                      <div className=" flex flex-row justify-center items-center">
                        <img
                          className="max-w-10 max-h-10 min-w-10 lg:max-h-16 lg:max-w-16 lg:min-w-16 rounded-full"
                          src={p?.player_image}
                        />
                        <div className="flex flex-col">
                          <p className="text-xl flex justify-start items-center flex-row ">
                            {p.player_name}
                            <span className="text-gray-700">
                              {p.player_number}
                            </span>
                          </p>
                          <p className="text-sm">{p.player_type}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MatchComponent;
