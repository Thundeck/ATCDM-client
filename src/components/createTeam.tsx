import { createTeam } from "@/actions";
import React, { ChangeEvent, FormEventHandler, useRef, useState } from "react";
import noLogo from "../../public/vecteezy_football-or-soccer-logo-vintage-vector-illustration-template_5545188.jpg";
import InputGoogle from "./inputGoogle";
import { Team } from "@/interfaces";
import { NotificationWarning } from "@/utils/tostify";

const initialState = {
  logo: "",
  name: "",
};

const CreateTeam = ({ setTeams }: { setTeams: (team: Team) => void }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const logo = reader.result;
        setForm({
          ...form,
          logo,
        });
      } else {
        NotificationWarning(
          "Error - reader.result is not a string",
          "top-right"
        );
      }
    };
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    {
      if (e.target.files) {
        const file = e.target.files[0];
        const type = file.name.split(".")[1];
        const imageFormat = ["png", "jpg", "jpeg"];
        if (!imageFormat.includes(type)) {
          return NotificationWarning(
            "Only jpg, png and jpeg formats are allowed",
            "top-right"
          );
        } else {
          previewFile(file);
        }
      } else {
        NotificationWarning("file not selected", "top-right");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTeam(form, setTeams);
    setForm(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-5 flex flex-col gap-5 w-fit min-w-80"
    >
      <h2 className="text-5xl w-full text-center font-play text-green-600">
        Create Team
      </h2>
      <InputGoogle
        type="text"
        name="name"
        value={form.name}
        handleChange={handleChange}
      >
        Team name
      </InputGoogle>
      <div>
        <label
          className="py-1 bg-green-600 flex justify-center items-center flex-row w-full gap-3 rounded-lg text-white text-xl font-play"
          htmlFor="input-file-team"
        >
          <img
            className="bg-green-500 max-w-14 min-h-14 w-full h-full rounded-full"
            src={form.logo || noLogo.src}
          />
          <div>
            <p>team logo</p>
            <p className="text-sm font-sans text-green-300">
              touch to select your logo
            </p>
          </div>
        </label>
        <input
          onChange={handleImage}
          className="hidden"
          id="input-file-team"
          type="file"
        />
      </div>
      <button className="bg-green-600 text-white py-3 capitalize rounded-lg font-semibold text-xl">
        send
      </button>
    </form>
  );
};

export default CreateTeam;
