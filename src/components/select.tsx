import { Country, Player } from "@/interfaces";
import React, { useState } from "react";
import { Check, ChevronUp } from "react-feather";

interface Props {
  values: Country[];
  setValues?: React.Dispatch<React.SetStateAction<string>>;
  setPlayers?: React.Dispatch<React.SetStateAction<Player[]>>;
  setDefaultPlayers?: React.Dispatch<React.SetStateAction<Player[]>>;
  children: string;
}

const initialState: Country = {
  id: "",
  name: "",
  image: "",
  players: [],
};

const Select = ({
  values,
  setValues,
  children,
  setPlayers,
  setDefaultPlayers,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(initialState);

  const handleValues = (e: Country) => {
    if (e.id && setValues) {
      setValues(e.id);
    }

    if (e.players && setPlayers && setDefaultPlayers) {
      const formatPlayers = e.players.map((t) => ({
        player_name: t.player_name,
        player_id: t.player_id,
        player_number: t.player_number,
        player_type: t.player_type,
        player_image: t.player_image,
      }));
      setPlayers(formatPlayers);
      setDefaultPlayers(formatPlayers);
    }
    setSelected(e);
    setOpen(false);
  };

  return (
    <div className=" flex justify-center items-center flex-row relative w-full min-w-80 lg:min-w-96">
      <label
        onClick={() => setOpen(!open)}
        className="text-white w-full p-2 rounded-l-lg text-sm bg-green-600 flex justify-center items-center"
        htmlFor="select-for-services"
      >
        {children}
      </label>
      <div
        onClick={() => setOpen(!open)}
        className="w-full text-nowrap max-w-[50%] max-h-9 p-2 bg-green-500/70 text-sm flex justify-start items-center pl-1 capitalize rounded-r-lg relative"
      >
        {selected.name && selected.image ? (
          <div className="flex justify-start items-center flex-row gap-1 ">
            <img className="max-w-8 max-h-5 rounded-md" src={selected.image} />
            <p className="overflow-hidden text-ellipsis max-w-[70%] text-start">
              {selected.name}
            </p>
          </div>
        ) : (
          <p>select</p>
        )}
        <ChevronUp
          className={` text-white absolute right-2 z-50 ${
            open ? "-rotate-180" : ""
          }`}
        />
      </div>
      {open && (
        <div
          id="select-for-services"
          className="w-full max-w-[24.25rem] h-44 overflow-auto -bottom-[11.1rem] right-0 py-2 z-[1100] bg-white absolute shadow-lg shadow-gray-600 rounded-lg"
        >
          {values.map((e, i: number) => (
            <button
              type="button"
              value={e.id}
              key={i}
              onClick={() => handleValues(e)}
              className="flex justify-start items-center flex-row hover:bg-gray-300 py-1 px-5 h-fit gap-5 w-full"
            >
              <img className="max-w-10 rounded-md" src={e.image} />
              <p className="text-black  font-semibold flex flex-row justify-start items-center gap-2 capitalize">
                {e.name}
              </p>

              {selected.id === e.id && (
                <Check className=" h-7 w-7 text-green-600 flex justify-center items-center text-xl"></Check>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
