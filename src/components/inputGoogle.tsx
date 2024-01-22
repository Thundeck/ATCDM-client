"use client";
import React, { useRef, useState } from "react";

interface InputGoogleProps {
  children: string;
  type: string;
  name?: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

const InputGoogle = ({
  children,
  type,
  name,
  value,
  handleChange,
  id,
}: InputGoogleProps) => {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div
      className={`relative col-span-1
         flex justify-center items-center flex-col w-full h-fit`}
    >
      <label
        htmlFor={id}
        onClick={focusInput}
        className={`h-3 left-0
          absolute z-10  transition-all duration-150 ease-linear flex justify-center items-center ${
            focus || (typeof value === "string" && value.length)
              ? "-translate-y-6 text-sm"
              : ` transform  translate-y-0`
          } cursor-text z-40 text-green-600`}
      >
        {children}
      </label>
      <input
        ref={inputRef}
        onChange={(e) => handleChange(e)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`appearance-none flex
           text-green-600 border-b-2 border-green-600 w-full h-full outline-none pb-1`}
        max={4}
        min={1}
        type={type}
        value={value}
        name={name}
        id={id}
      />
    </div>
  );
};

export default InputGoogle;
