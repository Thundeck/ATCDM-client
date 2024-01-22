import {
  addPlayerToTeam,
  getAllCountries,
  getAllSelectedLeagues,
  getAllSelectedTeams,
} from "@/actions";
import { Player } from "@/interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import { Check } from "react-feather";
import noImage from "../../public/soccer-svgrepo-com.svg";
import InputGoogle from "./inputGoogle";
import Select from "./select";
import { NotificationWarning } from "@/utils/tostify";

interface Props {
  currentTeam: string | undefined;
  setPlayersArr: (player: Player) => void;
}

const initialState: Player = {
  player_image: "",
  player_id: "",
  player_name: "",
  player_number: 0,
  player_type: "",
};

const SearchPlayer = ({ currentTeam, setPlayersArr }: Props) => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [defaultPlayers, setDefaultPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(initialState);

  useEffect(() => {
    getAllCountries(setCountries);
    if (selectedCountry) {
      setLeagues([]);
      setTeams([]);
      getAllSelectedLeagues(selectedCountry, setLeagues);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedLeague) {
      setTeams([]);
      getAllSelectedTeams(selectedLeague, setTeams);
    }
  }, [selectedLeague]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    searchFilter(e.target.value);
  };

  const searchFilter = (value: string) => {
    const playersFilter = defaultPlayers.filter((e) =>
      e.player_name.toLowerCase().includes(value.toLowerCase())
    );
    setPlayers(playersFilter);
  };

  const hadleAddPlayer = () => {
    if (currentTeam && selectedPlayer?.player_name) {
      addPlayerToTeam(currentTeam, setPlayersArr, selectedPlayer);
      return;
    }
    NotificationWarning("No player selected", "top-right");
  };

  return (
    <main className="flex justify-center items-center flex-col gap-5 min-w-80 lg:min-w-96">
      <h3 className="text-green-600 text-xl font-play">
        Select the player you like the most
      </h3>
      <section className="flex flex-col gap-2">
        <Select values={countries} setValues={setSelectedCountry}>
          League country
        </Select>
        {leagues.length && (
          <Select values={leagues} setValues={setSelectedLeague}>
            Player's league
          </Select>
        )}
        {leagues.length && teams.length && (
          <Select
            values={teams}
            setPlayers={setPlayers}
            setDefaultPlayers={setDefaultPlayers}
          >
            Player's team
          </Select>
        )}
      </section>

      <InputGoogle type="text" handleChange={handleChange} value={input}>
        Player lastname
      </InputGoogle>

      <ul className=" rounded-lg text-green-600 font-play text-2xl min-h-60 max-h-60 lg:min-h-48 lg:max-h-48 overflow-auto flex justify-start items-start flex-col w-full shadow-inner shadow-gray-400 p-1 gap-1">
        {players.length ? (
          players.map((p) => (
            <li
              key={p?.player_id}
              onClick={() => setSelectedPlayer(p)}
              className={`${
                selectedPlayer === p ? "bg-green-600 text-white" : ""
              } flex justify-start items-center flex-row w-full gap-2 py-1 shadow-sm shadow-gray-400 rounded-lg px-5`}
            >
              <img
                className="max-w-16 min-w-16 rounded-full"
                src={p?.player_image || noImage}
              />
              <div className="flex flex-col">
                <p className="text-xl flex justify-start items-center flex-row gap-2">
                  {p.player_name}
                  <span className="text-gray-700">{p.player_number}</span>
                </p>
                <p className="text-sm">{p.player_type}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="w-full h-full flex justify-center items-center pt-20">
            wanted players
          </p>
        )}
      </ul>
      <button
        onClick={() => hadleAddPlayer()}
        className="bg-green-600 font-play text-4xl px-5 py-1 rounded-lg active:bg-green-500 lg:hover:bg-green-500 shadow-lg shadow-gray-400"
      >
        Add player
      </button>
    </main>
  );
};

export default SearchPlayer;
