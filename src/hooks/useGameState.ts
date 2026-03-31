import { useState } from "react";

export const useGameState = () => {
  const [gameIndex, setGameIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);

  const resetGameState = () => {
    setGameIndex(0);
    setLevelIndex(0);
  };

  const advanceLevel = (isOnFinalLevel: boolean, isOnFinalGame: boolean) => {
    if (isOnFinalLevel) {
      if (isOnFinalGame) {
        setGameIndex(0);
        return;
      }
      setGameIndex((prev) => prev + 1);
      setLevelIndex(0);
    } else {
      setLevelIndex((prev) => prev + 1);
    }
  };

  return {
    gameIndex,
    levelIndex,
    setGameIndex,
    setLevelIndex,
    resetGameState,
    advanceLevel,
  };
};
