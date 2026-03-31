import { useState } from "react";

export const useGameplayUI = () => {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isPreGameVisible, setIsPreGameVisible] = useState(true);
  const [isGamePlayVisible, setIsGamePlayVisible] = useState(false);
  const [isLoadingLevel, setIsLoadingLevel] = useState(false);
  const [isAchievedVisible, setIsAchievedVisible] = useState(false);
  const [isKeystrokesTextVisible, setIsKeystrokesTextVisible] = useState(false);

  const startGamePlay = () => {
    setIsIntroVisible(false);
    setIsPreGameVisible(false);
    setIsGamePlayVisible(true);
  };

  const resetUI = () => {
    setIsKeystrokesTextVisible(false);
    setIsLoadingLevel(false);
    setIsAchievedVisible(false);
  };

  return {
    isIntroVisible,
    setIsIntroVisible,
    isPreGameVisible,
    setIsPreGameVisible,
    isGamePlayVisible,
    setIsGamePlayVisible,
    isLoadingLevel,
    setIsLoadingLevel,
    isAchievedVisible,
    setIsAchievedVisible,
    isKeystrokesTextVisible,
    setIsKeystrokesTextVisible,
    startGamePlay,
    resetUI,
  };
};
