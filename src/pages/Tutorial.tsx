import "../App.css";
import { useEffect, useState, useRef, useReducer } from "react";
import { reducer, initialState } from "../hooks/useGameState";
import { games as levelsData } from "../data";
import { populateLabel, areActiveKeysPressed } from "../utils/helpers";
import Button from "../components/Button/Button";
import Spinner from "../components/Spinner/Spinner";
import Keyboard from "../components/Keyboard/Keyboard";
import Textarea from "../components/Textarea";
import Label from "../components/Label/Label";
import { useNavigate } from "react-router-dom";

const userAgent = window.navigator.userAgent;
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );

function Tutorial() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const [newKey, setNewKey] = useState("Tab"); // if truthy, keyboard is displayed
  const areRequirementsMet = state.areRequirementsMet;
  const isAchievedVisible = state.phase === "exercise-complete";
  const isNextBtnDisabled = state.phase !== "exercise-complete";
  const isNextBtnVisible = state.phase !== "tutorial-complete";
  const isResetBtnVisible = state.phase === "tutorial-complete";
  const isKeystrokesTextVisible =
    state.phase === "exercise-complete" &&
    state.keystrokes ==
      levelsData[state.trackIndex][state.exerciseIndex].minKeystrokes;
  const keystrokes = state.keystrokes;
  const isLoadingLevel = state.phase === "loading";
  const levelData = levelsData[state.trackIndex][state.exerciseIndex];

  useEffect(() => {
    handleReset();
  }, []);

  // Constants
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nSuscipit nemo odit optio architecto aperiam incidunt pariatur reiciendis ea!\nUt, id.";

  const labelData = populateLabel(
    levelData,
    state.trackIndex,
    state.exerciseIndex,
  );

  const handleNewKeydown = (e: KeyboardEvent) => {
    const keyboard = document.getElementById("keyboard");
    if (e.code == newKey) {
      dispatch({ type: "KEY_INTRODUCED" });
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
    dispatch({ type: "RESET" });
    window.setTimeout(() => {
      window.setTimeout(() => {
        textareaRef.current?.focus();
      }, 1);
    }, 1000);
  };

  const handleNextClick = () => {
    dispatch({ type: "NEXT_CLICKED" });
    window.setTimeout(() => {
      dispatch({ type: "LOADED" });
      window.setTimeout(() => {
        textareaRef.current?.focus();
      }, 1);
    }, 1000);
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
      dispatch({ type: "EXERCISE_WON" });
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!state.acceptableKeys.some((key) => e.code.includes(key))) {
      e.preventDefault();
      return;
    }
    if (e.repeat || state.phase === "exercise-complete") {
      return;
    }

    if (!e.code.includes("Tab") && !e.code.includes("Escape")) {
      dispatch({ type: "KEY_PRESSED" });
    }
    if (
      !e.code.includes("Arrow") &&
      !e.code.includes("Backspace") &&
      !e.code.includes("KeyK")
    ) {
      return;
    }

    if (
      e.code.includes(levelData.keyword) &&
      areActiveKeysPressed(e, levelData.activeKeys)
    ) {
      dispatch({ type: "REQUIREMENTS_MET" });
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    const innerContainer = document.getElementsByClassName(
      "inner",
    )[0] as HTMLElement;

    const keys = document.getElementsByClassName("key");
    for (const key of keys) {
      if (key.id != newKey) {
        (key as HTMLDivElement).classList.remove("new-key");
      }
    }

    if (textarea) {
      const levelData = levelsData[state.trackIndex][state.exerciseIndex];

      // Update UI for new level
      innerContainer.style.display = !isMobile && !newKey ? "flex" : "none";
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
    }
  }, [state.trackIndex, state.exerciseIndex, newKey]);

  useEffect(() => {
    if (levelData.newKey) {
      setNewKey(levelData.newKey);
    }
  }, [levelData.newKey]);

  return (
    <>
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
        <div className="game-play container" style={{ display: "flex" }}>
          <Spinner isDisplayed={isLoadingLevel}></Spinner>
          <div
            style={{
              display: !isLoadingLevel ? "flex" : "none",
              flexDirection: "column",
            }}
            className="container game"
          >
            <div className="label">
              <Label {...labelData} />
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
                  Achieved level {state.exerciseIndex + 1}!
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
