import React, { useState, useRef, useEffect } from "react";

function Counter({
  startGame,
  setTime,
}: {
  startGame: () => void;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [counter, setCounter] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const max = 60 * 60;
  const totalTime = 8 * 60;
  const interval = (totalTime * 1000) / max;

  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const startCounter = () => {
    setIsActive(true);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(() => {
      setCounter((prevCounter) => {
        let nextCounter = prevCounter + 1;
        if (nextCounter <= max) {
          return nextCounter;
        } else {
          clearInterval(intervalId.current as NodeJS.Timeout);
          setIsActive(false);
          return max;
        }
      });
    }, interval);
  };

  const formatTime = (seconds: number) => {
    let minutes: number | string = Math.floor(seconds / 60);
    let remainingSeconds: number | string = seconds % 60;

    minutes = ("0" + minutes).slice(-2);
    remainingSeconds = ("0" + remainingSeconds).slice(-2);

    let formattedTime = minutes + ":" + remainingSeconds;

    return formattedTime;
  };

  const handleStart = () => {
    startCounter();
    startGame();
  };

  useEffect(() => {
    setTime(formatTime(counter));
  }, [counter]);

  return (
    <div className="flex justify-center items-center flex-col gap-1">
      <p className="text-lg">{formatTime(counter)}</p>
      <button
        className={`bg-white text-green-600 font-play px-4 py-1 text-xl lg:text-3xl rounded-lg shadow-lg shadow-black/30 lg:hover:bg-green-700 lg:hover:text-white active:bg-green-700 active:text-white disabled:hidden`}
        onClick={handleStart}
        disabled={isActive}
      >
        Start
      </button>
    </div>
  );
}

export default Counter;
