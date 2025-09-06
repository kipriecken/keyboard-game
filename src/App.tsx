/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { useEffect } from "react";
import { games as levelsData, type GameLevel } from "./data";
import Modal from "./components/Modal";
import Header from "./components/Header";
import ButtonSvg from "./components/ButtonSvg";
import { populateLabel } from "./utils/helpers";

function App() {
  useEffect(() => {
    const modal = document.getElementsByClassName("modal")[0] as HTMLElement;
    const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    const achieved = document.getElementsByClassName(
      "achieved"
    )[0] as HTMLElement;
    const intro = document.getElementsByClassName("intro")[0] as HTMLElement;
    const partTwo = document.getElementsByClassName(
      "part-two"
    )[0] as HTMLElement;
    const partThree = document.getElementsByClassName(
      "part-three"
    )[0] as HTMLElement;
    const safari = document.getElementsByClassName("safari")[0] as HTMLElement;
    const preGame = document.getElementsByClassName(
      "pre-game"
    )[0] as HTMLElement;
    const windows = document.getElementsByClassName(
      "windows"
    )[0] as HTMLElement;
    const focusBtn = document.getElementsByClassName("focus")[0] as HTMLElement;
    const focusSpan = document.getElementsByClassName(
      "focus-span"
    )[0] as HTMLElement;
    const focusTooBtn = document.getElementsByClassName(
      "focus-too"
    )[0] as HTMLElement;
    const focusTooSpan = document.getElementsByClassName(
      "focus-too-span"
    )[0] as HTMLElement;
    const playBtn = document.getElementsByClassName("play")[0] as HTMLElement;
    const playSpan = document.getElementsByClassName(
      "play-span"
    )[0] as HTMLElement;
    const gamePlay = document.getElementsByClassName(
      "game-play"
    )[0] as HTMLElement;
    const resetBtn = document.getElementsByClassName("reset")[0] as HTMLElement;
    const keystrokesCounter = document.getElementsByClassName(
      "counter"
    )[0] as HTMLElement;
    const innerContainer = document.getElementsByClassName(
      "inner"
    )[0] as HTMLElement;
    const keystrokesText = document.getElementsByClassName(
      "keystrokes"
    )[0] as HTMLElement;
    const nextBtn = document.getElementById("next") as HTMLButtonElement;
    const mobileDiv = document.getElementsByClassName(
      "is-mobile"
    )[0] as HTMLElement;
    const label = document.getElementsByTagName("label")[0] as HTMLElement;

    const userAgent = window.navigator.userAgent;
    const isMac = userAgent.includes("Macintosh");
    const isSafari =
      userAgent.includes("Safari") && !userAgent.includes("Chrome");
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );

    let acceptableKeys = ["Arrow", "Shift", "Option", "Escape", "Meta", "Tab"];

    // Constants
    const text =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nSuscipit nemo odit optio architecto aperiam incidunt pariatur reiciendis ea!\nUt, id.";

    // State
    let gameIndex = 0;
    let levelIndex = 0;
    let keystrokes = 0;
    let areRequirementsMet = false;
    let isLevelOver = false;

    label.innerHTML = "";

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isMobile
      ? (innerContainer.style.display = "none")
      : (mobileDiv.style.display = "none");

    if (!isMac) windows.style.display = "block";

    if (isSafari) {
      safari.style.display = "block";
    }

    window.onblur = () => {
      modal.style.display = "flex";
    };
    window.onfocus = () => {
      modal.style.display = "none";
    };

    const prepareTextarea = (level: GameLevel) => {
      textarea.style.display = "block";
      textarea.value = text;
      textarea.focus();
      textarea.setSelectionRange(
        level.startingCursorPosition ? level.startingCursorPosition[0] : 0,
        level.startingCursorPosition ? level.startingCursorPosition[1] : 0
      );
    };

    const isOnFinalLevel = () => levelIndex == levelsData[gameIndex].length - 1;
    const isOnFinalGame = () => gameIndex == levelsData.length - 1;

    const updateLevel = () => {
      const level = levelsData[gameIndex][levelIndex];
      label.innerHTML = populateLabel(level, gameIndex, levelIndex);
      prepareTextarea(level);
    };

    keystrokesCounter.innerText = keystrokes + "";
    updateLevel();

    const handleReset = () => {
      keystrokesText.style.visibility = "hidden";
      gameIndex = 0;
      levelIndex = 0;
      resetTextarea();
      isLevelOver = false;
      keystrokes = 0;
      resetBtn.style.display = "none";
      acceptableKeys = ["Arrow", "Shift", "Option", "Escape", "Meta", "Tab"];
    };

    const resetTextarea = () => {
      innerContainer.style.display = "flex";
      updateLevel();
      areRequirementsMet = false;
      nextBtn.style.display = "inline";
      nextBtn.disabled = true;
      achieved.style.display = "none";
      keystrokesCounter.innerText = "0";
      keystrokes = 0;
      keystrokesText.style.visibility = "hidden";
    };

    focusBtn.addEventListener("focus", () => {
      focusSpan.innerText = "Selected";
      partTwo.style.display = "flex";
    });
    focusBtn.addEventListener("blur", () => {
      focusSpan.innerText = "Select me";
    });
    focusTooBtn.addEventListener("focus", () => {
      focusTooSpan.innerText = "Selected";
      partThree.style.display = "flex";
    });
    focusTooBtn.addEventListener("blur", () => {
      focusTooSpan.innerText = "Select me";
    });

    playBtn.addEventListener("focus", () => {
      playSpan.innerText = "Hit return";
    });
    playBtn.addEventListener("blur", () => {
      playSpan.innerText = "Select me";
    });
    playBtn.addEventListener("click", () => {
      intro.style.visibility = "visible";
      preGame.style.display = "none";
      gamePlay.style.display = "flex";
      handleReset();
    });
    resetBtn.addEventListener("click", handleReset);

    nextBtn.addEventListener("click", () => {
      if (isOnFinalLevel()) {
        if (isOnFinalGame()) {
          gameIndex = 0; // not sure if should be done here or later
          nextBtn.disabled = true;
          return;
        }
        ++gameIndex;
        if (gameIndex == 2) {
          acceptableKeys.push("Backspace");
          acceptableKeys.push("KeyK");
          console.log(`updated acceptable keys: ${acceptableKeys}`);
        }
        levelIndex = 0;
      } else {
        ++levelIndex;
      }
      resetTextarea();
      isLevelOver = false;
    });

    const handleTextareaKeydown = (e: KeyboardEvent) => {
      if (!acceptableKeys.some((key) => e.code.includes(key))) {
        e.preventDefault();
        return;
      }
      if (e.repeat || isLevelOver) {
        return;
      }

      const level = levelsData[gameIndex][levelIndex];

      if (!e.code.includes("Tab") && !e.code.includes("Escape")) {
        keystrokesCounter.innerText = ++keystrokes + "";
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
          level.activeKeys.includes("alt") == e.altKey &&
          level.activeKeys.includes("shift") == e.shiftKey &&
          level.activeKeys.includes("control") == e.ctrlKey &&
          level.activeKeys.includes("meta") == e.metaKey
        );
      };

      if (e.code.includes(level.keyword) && areActiveKeysPressed()) {
        areRequirementsMet = true;
      }
    };

    textarea.addEventListener("keydown", (e) => {
      handleTextareaKeydown(e);
    });

    const handleLevelWin = (minKeystrokes: number) => {
      achieved.innerText = `Achieved level ${levelIndex + 1}!`;
      isLevelOver = true;
      achieved.style.display = "block";
      if (keystrokes == minKeystrokes) {
        keystrokesText.style.visibility = "visible";
      }
      if (isOnFinalGame() && isOnFinalLevel()) {
        resetBtn.style.display = "block";
        nextBtn.style.display = "none";
      } else {
        nextBtn.disabled = false;
      }
    };

    textarea.addEventListener("keyup", () => {
      if (!areRequirementsMet) {
        return;
      }
      const level = levelsData[gameIndex][levelIndex];
      const finalCursorLocation = level.finalCursorLocation
        ? level.finalCursorLocation
        : [0, 0];

      const isCursorInPlace =
        textarea.selectionStart == finalCursorLocation[0] &&
        textarea.selectionEnd == finalCursorLocation[1];

      if (isCursorInPlace) {
        handleLevelWin(level.minKeystrokes);
      }
    });
  });
  return (
    <>
      <Modal></Modal>
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
            <button className="focus">
              <ButtonSvg></ButtonSvg>
              <span className="focus-span">Select me</span>
            </button>
            <div className="part-two">
              <div>tab moves you to the next button on a page.</div>
              <div>shift + tab moves you backward.</div>
              <div>
                If you move backward off the page, press tab to move back on.
              </div>
              <button className="focus-too">
                <ButtonSvg></ButtonSvg>
                <span className="focus-too-span">Select me</span>
              </button>
            </div>
            <div className="part-three">
              <div>Got it?</div>
              <div>
                Select this final button and hit return to &apos;click&apos;.
              </div>
              <button className="play">
                <ButtonSvg></ButtonSvg>
                <span className="play-span">Select me</span>
              </button>
            </div>
          </div>
        </div>
        <div className="game-play container">
          <div className="label">
            <label htmlFor="text"></label>
          </div>
          <div className="relative">
            <textarea
              name="text"
              id="textarea"
              rows={5}
              cols={75}
              spellCheck="false"
            ></textarea>
          </div>
          <div className="stats">
            <div className="btn-container">
              <button id="next">
                <ButtonSvg></ButtonSvg>
                <span>Next</span>
              </button>
              <button className="reset">
                <ButtonSvg></ButtonSvg>
                <span>Play again</span>
              </button>
            </div>
            <div className="counter-container">
              Keystrokes: <span className="counter">0</span>
            </div>
            <div className="achieved-container">
              <div className="keystrokes">Minimum keystrokes!</div>
              <div className="achieved"></div>
            </div>
          </div>
          <div className="sidebar"></div>
        </div>
      </div>
    </>
  );
}

export default App;
