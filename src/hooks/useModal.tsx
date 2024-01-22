"use client";
import { useState } from "react";

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const modalOpen: React.MouseEventHandler<HTMLButtonElement | SVGElement> = (
    _
  ) => {
    setIsOpen(true);
  };
  const modalClose: React.MouseEventHandler<HTMLButtonElement | SVGElement> = (
    _
  ) => {
    setIsOpen(false);
  };

  return { isOpen, modalOpen, modalClose };
};
