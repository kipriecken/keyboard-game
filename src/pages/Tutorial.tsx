import "../App.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { games as levelsData } from "../data";
import Modal from "../components/Modal/Modal";
import { populateLabel } from "../utils/helpers";
import Button from "../components/Button/Button";
import Spinner from "../components/Spinner/Spinner";
import Keyboard from "../components/Keyboard/Keyboard";
import Textarea from "../components/Textarea";
import { useNavigate } from "react-router-dom";
import { useGameState } from "../hooks/useGameState";

const userAgent = window.navigator.userAgent;
const isMac = userAgent.includes("Macintosh");
const isSafari = userAgent.includes("Safari") && !userAgent.includes("Chrome");
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );

function Tutorial() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const gameState = useGameState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newKey, setNewKey] = useState("Tab"); // if truthy, keyboard is displayed
  const [acceptableKeys, setAcceptableKeys] = useState([
    "Arrow",
    "Shift",
    "Alt",
    "Escape",
    "Meta",
    "Tab",
    "Control",
    "KeyL",
  ]);
  const [areRequirementsMet, setAreRequirementsMet] = useState(false);
  const [isLevelOver, setIsLevelOver] = useState(false);
  const [isAchievedVisible, setIsAchievedVisible] = useState(false);
  const [isTwoVisible, setIsTwoVisible] = useState(false);
  const [isThreeVisible, setIsThreeVisible] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isPreGameVisible, setIsPreGameVisible] = useState(!isMobile);
  const [isGamePlayVisible, setIsGamePlayVisible] = useState(false);
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);
  const [isNextBtnVisible, setIsNextBtnVisible] = useState(true);
  const [isResetBtnVisible, setIsResetBtnVisible] = useState(true);
  const [isKeystrokesTextVisible, setIsKeystrokesTextVisible] = useState(false);
  const [keystrokes, setKeystrokes] = useState(0);
  const [isLoadingLevel, setIsLoadingLevel] = useState(true);

  const levelData = levelsData[gameState.gameIndex][gameState.levelIndex];

  useEffect(() => {
    const setModalVisible = () => {
      setIsModalVisible(true);
    };
    const setModalInvisible = () => {
      setIsModalVisible(false);
    };
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("blur", setModalVisible);
    window.addEventListener("focus", setModalInvisible);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("blur", setModalVisible);
      window.removeEventListener("focus", setModalInvisible);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Constants
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nSuscipit nemo odit optio architecto aperiam incidunt pariatur reiciendis ea!\nUt, id.";

  const handleNewKeydown = (e: KeyboardEvent) => {
    const keyboard = document.getElementById("keyboard");
    if (e.code == newKey) {
      e.preventDefault();
      if (keyboard) {
        keyboard.style.opacity = "0";
        keyboard.style.transition = "opacity 0.5s ease-out";
      }
      window.setTimeout(() => {
        setNewKey("");
        if (keyboard) {
          keyboard.style.opacity = "1";
        }
      }, 500);
      return;
    }
    if (e.repeat) {
      return;
    }
    const keyElement = document.getElementById(e.code)!;
    keyElement.classList.add("key-pressed");
    if (e.code.includes("ArrowUp") || e.code.includes("ArrowDown")) {
      keyElement.style.transform = "translate(9px, 0.7px)";
    } else {
      keyElement.style.transform = "translate(0.7px, 0.7px)";
    }
  };

  const handleNewKeyup = (e: KeyboardEvent) => {
    const keyElement = document.getElementById(e.code)!;
    keyElement.classList.remove("key-pressed");
    keyElement.style.transform = "";
    keyElement.style.animation = "flash 0.75s";
    window.setTimeout(() => (keyElement.style.animation = ""), 750);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleNewKeydown);
    document.addEventListener("keyup", handleNewKeyup);

    return () => {
      document.removeEventListener("keydown", handleNewKeydown);
      document.removeEventListener("keyup", handleNewKeyup);
    };
  });

  const handleReset = () => {
    setIsLoadingLevel(true);
    window.setTimeout(() => {
      setIsKeystrokesTextVisible(false);
      gameState.resetGameState();
      setIsLevelOver(false);
      setKeystrokes(0);
      setIsNextBtnVisible(true);
      setIsResetBtnVisible(false);
      setAcceptableKeys([
        "Arrow",
        "Shift",
        "Alt",
        "Escape",
        "Meta",
        "Tab",
        "Control",
      ]);
      setIsLoadingLevel(false);
      window.setTimeout(() => {
        textareaRef.current?.focus();
      }, 1);
    }, 1000);
  };

  const isOnFinalLevel = useMemo(
    () => gameState.levelIndex == levelsData[gameState.gameIndex].length - 1,
    [gameState.levelIndex, gameState.gameIndex],
  );
  const isOnFinalGame = useMemo(
    () => gameState.gameIndex == levelsData.length - 1,
    [gameState.gameIndex],
  );

  const partOneFocusHandler = () => {
    setIsTwoVisible(true);
  };
  const partTwoFocusHandler = () => {
    setIsThreeVisible(true);
  };
  const partThreeClickHandler = () => {
    setIsIntroVisible(true);
    setIsPreGameVisible(false);
    setIsGamePlayVisible(true);
    handleReset();
  };

  const handleNextClick = () => {
    setIsLoadingLevel(true);
    setIsAchievedVisible(false);
    if (isOnFinalLevel) {
      if (isOnFinalGame) {
        gameState.setGameIndex(0); // not sure if should be done here or later
        setIsNextBtnDisabled(true);
        return;
      }
      gameState.setGameIndex((i) => i + 1);
      if (gameState.gameIndex == 1) {
        // gameIndex will be 1 when on final level
        setAcceptableKeys((k) => [...k, "Backspace", "KeyK", "KeyZ"]);
      }
      gameState.setLevelIndex(0);
    } else {
      gameState.setLevelIndex((i) => i + 1);
    }
    setIsLevelOver(false);
    window.setTimeout(() => {
      setIsLoadingLevel(false);
      window.setTimeout(() => {
        textareaRef.current?.focus();
      }, 1);
    }, 1000);
  };

  const handleLevelWin = () => {
    setIsLevelOver(true);
    setIsAchievedVisible(true);
    if (keystrokes == levelData.minKeystrokes) {
      setIsKeystrokesTextVisible(true);
    }
    if (isOnFinalGame && isOnFinalLevel) {
      setIsResetBtnVisible(true);
      setIsNextBtnVisible(false);
    } else {
      setIsNextBtnDisabled(false);
    }
  };

  const handleKeyup = () => {
    if (!areRequirementsMet) {
      return;
    }
    const finalCursorLocation = levelData.finalCursorLocation
      ? levelData.finalCursorLocation
      : [0, 0];

    const isCursorInPlace =
      textareaRef.current?.selectionStart == finalCursorLocation[0] &&
      textareaRef.current?.selectionEnd == finalCursorLocation[1];

    if (isCursorInPlace) {
      handleLevelWin();
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!acceptableKeys.some((key) => e.code.includes(key))) {
      e.preventDefault();
      return;
    }
    if (e.repeat || isLevelOver) {
      return;
    }

    if (!e.code.includes("Tab") && !e.code.includes("Escape")) {
      setKeystrokes((s) => s + 1);
    }
    if (
      !e.code.includes("Arrow") &&
      !e.code.includes("Backspace") &&
      !e.code.includes("KeyK")
    ) {
      return;
    }

    const areActiveKeysPressed = () => {
      return (
        levelData.activeKeys.includes("alt") == e.altKey &&
        levelData.activeKeys.includes("shift") == e.shiftKey &&
        levelData.activeKeys.includes("control") == e.ctrlKey &&
        levelData.activeKeys.includes("meta") == e.metaKey
      );
    };

    if (e.code.includes(levelData.keyword) && areActiveKeysPressed()) {
      setAreRequirementsMet(true);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    const label = document.getElementsByTagName("label")[0] as HTMLElement;
    const innerContainer = document.getElementsByClassName(
      "inner",
    )[0] as HTMLElement;

    const keys = document.getElementsByClassName("key");
    for (const key of keys) {
      if (key.id != newKey) {
        (key as HTMLDivElement).classList.remove("new-key");
      }
    }

    if (textarea && label) {
      const levelData = levelsData[gameState.gameIndex][gameState.levelIndex];

      // Update UI for new level
      innerContainer.style.display = !isMobile && !newKey ? "flex" : "none";
      label.innerHTML = populateLabel(
        levelData,
        gameState.gameIndex,
        gameState.levelIndex,
      );
      textarea.style.display = "block";
      textarea.value = text;
      textarea.focus();
      textarea.setSelectionRange(
        levelData.startingCursorPosition
          ? levelData.startingCursorPosition[0]
          : 0,
        levelData.startingCursorPosition
          ? levelData.startingCursorPosition[1]
          : 0,
      );

      setIsNextBtnDisabled(true);
      setIsAchievedVisible(false);
      setKeystrokes(0);
      setIsKeystrokesTextVisible(false);
      setAreRequirementsMet(false);
    }
  }, [gameState.gameIndex, gameState.levelIndex, newKey, isGamePlayVisible]);

  useEffect(() => {
    if (levelData.newKey && isGamePlayVisible) {
      setNewKey(levelData.newKey);
    }
  }, [levelData.newKey, isGamePlayVisible]);

  return (
    <>
      <Modal visibility={isModalVisible}></Modal>
      <Keyboard newKey={newKey} isDisplayed={!isMobile}></Keyboard>
      <div
        className="is-mobile container"
        style={{ display: isMobile ? "block" : "none" }}
      >
        This game has no current applications for mobile devices. Please visit
        on a computer.
      </div>
      <div
        className="inner container"
        style={{ display: !isMobile && !newKey ? "flex" : "none" }}
      >
        <div className="drawer"></div>
        <div
          className="pre-game container"
          style={{ display: isPreGameVisible ? "flex" : "none" }}
        >
          <div
            className="intro"
            style={{ visibility: isIntroVisible ? "visible" : "hidden" }}
          >
            <p
              className="safari"
              style={{ display: isSafari ? "block" : "none" }}
            >
              To play on Safari, click on Safari at the top, then &gt;
              Preferences &gt;. Check the box at Press Tab to highlight each
              item on a web page.
              <br></br>
              <br></br>
              If using an iPad, go to Settings &gt; Accessibility &gt; Keyboards
              & Typing, select Full Keyboard Access and switch on.
            </p>
            <p
              className="windows"
              style={{ display: !isMac ? "block" : "none" }}
            >
              Note: this game is not configured for Windows.
            </p>
            <div>With tab you can navigate a page</div>
            <Button
              focus="Selected"
              blur="Tab to me"
              className="one"
              onFocus={partOneFocusHandler}
            ></Button>
            <div
              className="part-two"
              style={{ display: isTwoVisible ? "flex" : "none" }}
            >
              {/* <div>And another time</div> */}
              <Button
                focus="Selected"
                blur="Tab to me"
                className="two"
                onFocus={partTwoFocusHandler}
              ></Button>
            </div>
            <div
              className="part-three"
              style={{ display: isThreeVisible ? "flex" : "none" }}
            >
              {/* <div>Ok, one more time</div> */}
              <Button
                onClick={partThreeClickHandler}
                focus="Hit return"
                blur="Tab to me"
                className="three"
              ></Button>
              <div>
                "Click" with return or spacebar for a brief shortcut tutorial
              </div>
            </div>
          </div>
        </div>
        <div
          className="game-play container"
          style={{ display: isGamePlayVisible ? "flex" : "none" }}
        >
          <Spinner isDisplayed={isLoadingLevel}></Spinner>
          <div
            style={{
              display: !isLoadingLevel ? "flex" : "none",
              flexDirection: "column",
            }}
            className="container game"
          >
            <div className="label">
              <label htmlFor="text"></label>
            </div>
            <div className="relative">
              <Textarea
                textareaRef={textareaRef}
                handleKeyup={handleKeyup}
                handleKeydown={handleKeydown}
                value={text}
              ></Textarea>
            </div>
            <div className="stats">
              <Button
                blur="Next level"
                className="next"
                onClick={handleNextClick}
                disabled={isNextBtnDisabled}
                isVisible={isNextBtnVisible}
              />
              <Button
                focus="Redo tutorial"
                blur="Redo tutorial"
                className="reset"
                onClick={handleReset}
                isVisible={isResetBtnVisible}
              />
              <Button
                blur="Play game"
                className="game-btn"
                onClick={() => navigate("/game")}
                isVisible={isResetBtnVisible}
              />
              <div style={{ visibility: "hidden" }}>
                {" "}
                // hiding this for now Keystrokes: {keystrokes}
                <div
                  className="keystrokes"
                  style={{
                    visibility: isKeystrokesTextVisible ? "visible" : "hidden",
                  }}
                >
                  Minimum keystrokes!
                </div>
              </div>
              <div className="achieved-container">
                <div
                  className="achieved"
                  style={{ display: isAchievedVisible ? "block" : "none" }}
                >
                  Achieved level {gameState.levelIndex + 1}!
                </div>
              </div>
            </div>
            <div className="sidebar"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tutorial;
