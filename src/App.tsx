import "./App.css";
import { useEffect, useState, useRef } from "react";
import { games as levelsData } from "./data";
import Modal from "./components/Modal";
import Header from "./components/Header";
import { populateLabel } from "./utils/helpers";
import Button from "./components/Button";
import Spinner from "./components/Spinner";
import Keyboard from "./components/Keyboard";
import Textarea from "./components/Textarea";

const userAgent = window.navigator.userAgent;
const isMac = userAgent.includes("Macintosh");
const isSafari = userAgent.includes("Safari") && !userAgent.includes("Chrome");
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newKey, setNewKey] = useState("Tab"); // if truthy, keyboard is displayed
  const [levelIndex, setLevelIndex] = useState(0);
  const [gameIndex, setGameIndex] = useState(0);
  const [acceptableKeys, setAcceptableKeys] = useState([
    "Arrow",
    "Shift",
    "Alt",
    "Escape",
    "Meta",
    "Tab",
    "Control",
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

  const levelData = levelsData[gameIndex][levelIndex];

  window.onblur = () => {
    setIsModalVisible(true);
  };
  window.onfocus = () => {
    setIsModalVisible(false);
  };
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
  });

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
    keyElement.style.boxShadow = "0 0 0 black";
    if (e.code.includes("ArrowUp") || e.code.includes("ArrowDown")) {
      keyElement.style.transform = "translate(9px, 0.7px)";
    } else {
      keyElement.style.transform = "translate(0.7px, 0.7px)";
    }
    keyElement.style.background = "lightgreen";
  };

  const handleNewKeyup = (e: KeyboardEvent) => {
    const keyElement = document.getElementById(e.code)!;
    keyElement.style.boxShadow = "2px 1px 2px black";
    keyElement.style.transform = "";
    keyElement.style.background = "black";
    keyElement.style.animation = "flash 0.75s";
    window.setTimeout(() => (keyElement.style.animation = ""), 750);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleNewKeydown);
    document.addEventListener("keyup", handleNewKeyup);

    return () => {
      document.removeEventListener("keydown", handleNewKeydown);
      document.addEventListener("keyup", handleNewKeyup);
    };
  });

  const handleReset = () => {
    setIsLoadingLevel(true);
    window.setTimeout(() => {
      setIsKeystrokesTextVisible(false);
      setGameIndex(0);
      setLevelIndex(0);
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

  const isOnFinalLevel = () => levelIndex == levelsData[gameIndex].length - 1;
  const isOnFinalGame = () => gameIndex == levelsData.length - 1;

  const partOneFocusHandler = () => {
    setIsTwoVisible(true);
  };
  const partTwoFocusHandler = () => {
    setIsThreeVisible(true);
  };
  const partThreeFocusHandler = () => {
    setIsIntroVisible(true);
    setIsPreGameVisible(false);
    setIsGamePlayVisible(true);
    handleReset();
  };

  const handleNextClick = () => {
    setIsLoadingLevel(true);
    setIsAchievedVisible(false);
    if (isOnFinalLevel()) {
      if (isOnFinalGame()) {
        setGameIndex(0); // not sure if should be done here or later
        setIsNextBtnDisabled(true);
        return;
      }
      setGameIndex((i) => i + 1);
      if (gameIndex == 1) {
        // gameIndex will be 1 when on final level
        setAcceptableKeys((k) => [...k, "Backspace", "KeyK"]);
      }
      setLevelIndex(0);
    } else {
      setLevelIndex((i) => i + 1);
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
    if (isOnFinalGame() && isOnFinalLevel()) {
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
        (key as HTMLDivElement).style.background = "black";
      }
    }

    if (textarea && label) {
      const levelData = levelsData[gameIndex][levelIndex];

      // Update UI for new level
      innerContainer.style.display = !isMobile && !newKey ? "flex" : "none";
      label.innerHTML = populateLabel(levelData, gameIndex, levelIndex);
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
  }, [gameIndex, levelIndex, newKey, isGamePlayVisible]);

  useEffect(() => {
    if (levelData.newKey && isGamePlayVisible) {
      setNewKey(levelData.newKey);
    }
  }, [levelData.newKey, isGamePlayVisible]);

  return (
    <>
      <Modal visibility={isModalVisible}></Modal>
      <Header visibility={newKey}></Header>
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
            <div>And...press tab again</div>
            <Button
              focus="Selected"
              blur="Select me"
              className="one"
              onFocus={partOneFocusHandler}
            ></Button>
            <div
              className="part-two"
              style={{ display: isTwoVisible ? "flex" : "none" }}
            >
              <div>And another time</div>
              <Button
                focus="Selected"
                blur="Select me"
                className="two"
                onFocus={partTwoFocusHandler}
              ></Button>
            </div>
            <div
              className="part-three"
              style={{ display: isThreeVisible ? "flex" : "none" }}
            >
              <div>Ok, one more time</div>
              <Button
                onClick={partThreeFocusHandler}
                focus="Hit return"
                blur="Select me"
                className="three"
              ></Button>
              <div>Use return or spacebar to "click"</div>
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
              ></Textarea>
            </div>
            <div className="stats">
              <Button
                focus="Next level"
                blur="Next level"
                className="next"
                onClick={handleNextClick}
                id="next"
                disabled={isNextBtnDisabled}
                isVisible={isNextBtnVisible}
              />
              <Button
                focus="Play again"
                blur="Play again"
                className="reset"
                onClick={handleReset}
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
                  Achieved level {levelIndex + 1}!
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

export default App;
