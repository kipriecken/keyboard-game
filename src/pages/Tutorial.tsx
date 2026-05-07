import "../App.css";
import "./Tutorial.css";
import { useEffect, useState, useRef, useReducer } from "react";
import { reducer, initialState } from "../hooks/useGameState";
import { tracks } from "../data";
import { areActiveKeysPressed } from "../utils/helpers";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import Spinner from "../components/Spinner/Spinner";
import Keyboard from "../components/Keyboard/Keyboard";
import Textarea from "../components/Textarea";
import Label from "../components/Label/Label";
import Confetti from "../components/Confetti/Confetti";
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
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const areRequirementsMet = state.areRequirementsMet;
  const isAchievedVisible = state.phase === "exercise-complete";
  const isResetBtnVisible = state.phase === "tutorial-complete";
  const isKeystrokesTextVisible =
    state.phase === "exercise-complete" &&
    state.keystrokes ==
      tracks[state.trackIndex][state.exerciseIndex].minKeystrokes;
  const keystrokes = state.keystrokes;
  const isLoadingExercise = state.phase === "loading";
  const currentExercise = tracks[state.trackIndex][state.exerciseIndex];

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    if (state.phase === "exercise-complete") {
      setConfettiTrigger((prev) => !prev);
      return;
    }
  }, [state.phase]);

  // Constants
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nSuscipit nemo odit optio architecto aperiam incidunt pariatur reiciendis ea!\nUt, id.";

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

  const handleExerciseCompletion = () => {
    // TODO: Why is this necessary? Unexpected behavior that inaccurately increments the exercise index starting with the second track (index 1). This is a bandaid fix, but I haven't been able to track down the root cause.
    if (state.phase === "exercise-complete") {
      return;
    }
    dispatch({ type: "NEXT_CLICKED" });
    window.setTimeout(() => {
      dispatch({ type: "LOADED" });
      window.setTimeout(() => {
        textareaRef.current?.focus();
      }, 1);
    }, 1000);
  };

  const handleKeyup = () => {
    // TODO: Related to the bandaid fix above. This seems to be getting triggered too many times.
    if (state.phase === "exercise-complete") {
      return;
    }
    if (!areRequirementsMet) {
      return;
    }
    const finalCursorLocation = currentExercise.finalCursorLocation
      ? currentExercise.finalCursorLocation
      : [0, 0];

    const isCursorInPlace =
      textareaRef.current?.selectionStart == finalCursorLocation[0] &&
      textareaRef.current?.selectionEnd == finalCursorLocation[1];

    if (isCursorInPlace) {
      dispatch({ type: "EXERCISE_WON" });
      if (
        state.trackIndex === tracks.length - 1 &&
        state.exerciseIndex === tracks[state.trackIndex].length - 1
      ) {
        return;
      }
      window.setTimeout(() => {
        handleExerciseCompletion();
      }, 1000);
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
      e.code.includes(currentExercise.keyword) &&
      areActiveKeysPressed(e, currentExercise.activeKeys)
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
      const levelData = tracks[state.trackIndex][state.exerciseIndex];

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
    if (currentExercise.newKey) {
      setNewKey(currentExercise.newKey);
    }
  }, [currentExercise.newKey]);

  return (
    <>
      <Header title="Home" hidden={true} />
      <Keyboard newKey={newKey} isDisplayed={!isMobile}></Keyboard>
      <Confetti trigger={confettiTrigger} />
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
          <Spinner isDisplayed={isLoadingExercise}></Spinner>
          <div
            style={{
              display: !isLoadingExercise ? "flex" : "none",
              flexDirection: "column",
            }}
            className="container game"
          >
            <div className="label">
              <Label
                level={currentExercise}
                gameIndex={state.trackIndex}
                levelIndex={state.exerciseIndex}
              />
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
                  Exercise {state.exerciseIndex + 1} complete!
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
