import { deletePlayer } from "@/actions";
import { Player } from "@/interfaces";
import { X } from "react-feather";
import noImage from "../../public/soccer-svgrepo-com.svg";

interface Props {
  players: Player[];
  setPlayersArr: (id: string) => void;
  currentTeam: string;
}

const CardContainer = ({ players, setPlayersArr, currentTeam }: Props) => {
  const handleDeletePlayer = (id: string) => {
    deletePlayer(id, setPlayersArr, currentTeam);
  };

  return (
    <ul className=" rounded-lg text-green-600 font-play text-2xl min-h-60 max-h-60 lg:min-h-48 lg:max-h-48 overflow-auto flex justify-start items-start flex-col w-full gap-1 p-1 shadow-inner shadow-gray-400">
      {players.map((p) => (
        <li
          key={p?.player_id}
          className="flex justify-between items-center flex-row w-full gap-2 py-1 bg-white rounded-lg px-5 shadow-sm shadow-gray-400"
        >
          <div className=" flex flex-row">
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
          </div>
          <X
            className="cursor-pointer text-white bg-green-600 active:bg-green-700 lg:hover:bg-green-700 rounded-full shadow-md shadow-gray-400"
            onClick={() => handleDeletePlayer(p.player_id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default CardContainer;
