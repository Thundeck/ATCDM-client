import React from "react";
import { X } from "react-feather";

interface Props {
  children: React.ReactElement;
  modalClose: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean | (() => void);
}

const Modal = ({ children, modalClose, isOpen }: Props) => {
  return (
    <div
      className={` ${
        isOpen ? "" : "hidden"
      } absolute h-full w-full top-0 left-0 z-50 bg-gray-900 bg-opacity-70 flex justify-center items-center`}
    >
      <div className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-end h-fit w-fit bg-white p-4 rounded-lg">
        <button onClick={modalClose} className="text-green-600 mb-2">
          <X height={25} width={25} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
