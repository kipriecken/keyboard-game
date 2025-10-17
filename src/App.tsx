import "./App.css";
import { useEffect, useState, useRef } from "react";
import { games as levelsData } from "./data";
import Modal from "./components/Modal";
import Header from "./components/Header";
import ButtonSvg from "./components/ButtonSvg";
import { populateLabel } from "./utils/helpers";
import Button from "./components/Button";

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
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);
  const [isNextBtnVisible, setIsNextBtnVisible] = useState(true);
  const [isResetBtnVisible, setIsResetBtnVisible] = useState(true);
  const [isKeystrokesTextVisible, setIsKeystrokesTextVisible] = useState(false);
  const [keystrokes, setKeystrokes] = useState(0);

  const levelData = levelsData[gameIndex][levelIndex];

  window.onblur = () => {
    setIsModalVisible(true);
  };
  window.onfocus = () => {
    setIsModalVisible(false);
  };

  // Constants
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nSuscipit nemo odit optio architecto aperiam incidunt pariatur reiciendis ea!\nUt, id.";

  const handleReset = () => {
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
    textareaRef.current?.focus();
  };

  const isOnFinalLevel = () => levelIndex == levelsData[gameIndex].length - 1;
  const isOnFinalGame = () => gameIndex == levelsData.length - 1;

  const handleNextClick = () => {
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

    if (textarea && label) {
      const levelData = levelsData[gameIndex][levelIndex];

      // Update UI for new level
      innerContainer.style.display = "flex";
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

      label.innerHTML = populateLabel(levelData, gameIndex, levelIndex);
      setIsNextBtnDisabled(true);
      setIsAchievedVisible(false);
      setKeystrokes(0);
      setIsKeystrokesTextVisible(false);
      setAreRequirementsMet(false);
    }
  }, [gameIndex, levelIndex]);

  useEffect(() => {
    const intro = document.getElementsByClassName("intro")[0] as HTMLElement;
    const partTwo = document.getElementsByClassName(
      "part-two",
    )[0] as HTMLElement;
    const partThree = document.getElementsByClassName(
      "part-three",
    )[0] as HTMLElement;
    const safari = document.getElementsByClassName("safari")[0] as HTMLElement;
    const preGame = document.getElementsByClassName(
      "pre-game",
    )[0] as HTMLElement;
    const windows = document.getElementsByClassName(
      "windows",
    )[0] as HTMLElement;
    const partOneButton = document.getElementsByClassName(
      "one",
    )[0] as HTMLElement;
    const partTwoButton = document.getElementsByClassName(
      "two",
    )[0] as HTMLElement;
    const partThreeButton = document.getElementsByClassName(
      "three",
    )[0] as HTMLElement;
    const gamePlay = document.getElementsByClassName(
      "game-play",
    )[0] as HTMLElement;
    const innerContainer = document.getElementsByClassName(
      "inner",
    )[0] as HTMLElement;
    const mobileDiv = document.getElementsByClassName(
      "is-mobile",
    )[0] as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isMobile
      ? (innerContainer.style.display = "none")
      : (mobileDiv.style.display = "none");

    if (!isMac) windows.style.display = "block";

    if (isSafari) {
      safari.style.display = "block";
    }

    partOneButton.addEventListener("focus", () => {
      partTwo.style.display = "flex";
    });
    partTwoButton.addEventListener("focus", () => {
      partThree.style.display = "flex";
    });
    partThreeButton.addEventListener("click", () => {
      intro.style.visibility = "visible";
      preGame.style.display = "none";
      gamePlay.style.display = "flex";
      handleReset();
    });
  }, []);
  return (
    <>
      <Modal visibility={isModalVisible}></Modal>
      <Header></Header>
      <div className="is-mobile container">
        This game has no current applications for mobile devices. Please visit
        on a computer.
      </div>
      <div className="inner container">
        <div className="drawer"></div>
        <div className="pre-game container">
          <div className="intro">
            <p className="safari">
              To play on Safari, check the box at Safari &gt; Preferences &gt;
              Press Tab to highlight each item on a web page. If using an iPad,
              go to Settings &gt; Accessibility &gt; Keyboards & Typing, select
              Full Keyboard Access and switch on.
            </p>
            <p className="windows">
              Note: this game is not configured for Windows.
            </p>
            <div>Locate the tab button and press it.</div>
            <Button focus="Selected" blur="Select me" className="one"></Button>
            <div className="part-two">
              <div>tab moves you to the next button on a page.</div>
              <div>shift + tab moves you backward.</div>
              <div>
                If you move backward off the page, press tab to move back on.
              </div>
              <Button
                focus="Selected"
                blur="Select me"
                className="two"
              ></Button>
            </div>
            <div className="part-three">
              <div>Got it?</div>
              <div>Select this final button and hit return to "click".</div>
              <Button
                focus="Hit return"
                blur="Select me"
                className="three"
              ></Button>
            </div>
          </div>
        </div>
        <div className="game-play container">
          <div className="label">
            <label htmlFor="text"></label>
          </div>
          <div className="relative">
            <textarea
              ref={textareaRef}
              name="text"
              id="textarea"
              rows={5}
              cols={75}
              spellCheck="false"
              onKeyUp={handleKeyup}
              onKeyDown={handleKeydown}
            ></textarea>
          </div>
          <div className="stats">
            <div className="btn-container">
              <button
                onClick={handleNextClick}
                id="next"
                disabled={isNextBtnDisabled}
                style={{ display: isNextBtnVisible ? "block" : "none" }}
              >
                <ButtonSvg></ButtonSvg>
                <span>Next</span>
              </button>
              <button
                className="reset"
                style={{ display: isResetBtnVisible ? "block" : "none" }}
                onClick={handleReset}
              >
                <ButtonSvg></ButtonSvg>
                <span>Play again</span>
              </button>
            </div>
            <div className="counter-container">
              Keystrokes: <span className="counter">{keystrokes}</span>
            </div>
            <div className="achieved-container">
              <div
                className="keystrokes"
                style={{
                  visibility: isKeystrokesTextVisible ? "visible" : "hidden",
                }}
              >
                Minimum keystrokes!
              </div>
              <div
                className="achieved"
                style={{ display: isAchievedVisible ? "block" : "none" }}
              >
                Achieved level {levelIndex + 1}
              </div>
            </div>
          </div>
          <div className="sidebar"></div>
        </div>
      </div>
    </>
  );
}

export default App;
