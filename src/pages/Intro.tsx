import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Keyboard from "../components/Keyboard/Keyboard";
import "./Intro.css";
import { useEffect, useReducer, useState } from "react";
import { initialState, reducer } from "../hooks/useGameState";


const Intro = () => {
  const userAgent = window.navigator.userAgent;
  const isMac = userAgent.includes("Macintosh");
  const isSafari =
    userAgent.includes("Safari") && !userAgent.includes("Chrome");
  const navigate = useNavigate();
    const [isTwoVisible, setIsTwoVisible] = useState(false);
  const [isThreeVisible, setIsThreeVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
  const [isKeyboardDisplayed, setIsKeyboardDisplayed] = useState(true);
  

    const partOneFocusHandler = () => {
    setIsTwoVisible(true);
  };
  const partTwoFocusHandler = () => {
    setIsThreeVisible(true);
  };

  const handleNewKeydown = (e: KeyboardEvent) => {
    const keyboard = document.getElementById("keyboard");
    if (e.code == "Tab") {
      dispatch({ type: "TAB_FIRST_PRESSED" });
      setIsKeyboardDisplayed(false);
      if (keyboard) {
        keyboard.style.opacity = "0";
        keyboard.style.transition = "opacity 0.5s ease-out";
      }
      window.setTimeout(() => {
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
      console.log({initialState})
      document.addEventListener("keydown", handleNewKeydown);
      document.addEventListener("keyup", handleNewKeyup);
  
      return () => {
        document.removeEventListener("keydown", handleNewKeydown);
        document.removeEventListener("keyup", handleNewKeyup);
      };
    });

  return (
    <>
      <Keyboard newKey={"Tab"} isDisplayed={isKeyboardDisplayed}></Keyboard>
      {state.phase === "intro" && (
      <div className="card">
        <div className="intro">
          {isSafari && (
            <p className="safari" style={{ display: "block" }}>
              To play on Safari, click on Safari at the top, then &gt; Preferences
              &gt;. Check the box at Press Tab to highlight each item on a web
              page.
              <br></br>
              <br></br>
              If using an iPad, go to Settings &gt; Accessibility &gt; Keyboards &
              Typing, select Full Keyboard Access and switch on.
            </p>
          )}
          {!isMac && (
            <p className="windows" style={{ display: "block" }}>
              Note: this game is not configured for Windows.
            </p>
          )}
          <div>Press tab again</div>
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
              <div>
                Tab allows you to navigate through elements on any webpage
              </div>
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
              <div>Press return or spacebar to "click" on elements</div>
              <Button
                onClick={() => navigate("/tutorial")}
                focus="Hit return"
                blur="Tab to me"
                className="three"
              ></Button>
              <div>"Click" the final button to continue!</div>
          {/* <p>
            Using a computer… lowkey{" "}
            <b>
              <i>stressful</i>
            </b>
            .
          </p>
          <p>
            Reaching for the mouse all day… highkey{" "}
            <b>
              <i>tiring</i>.
            </b>
          </p>
          <br />
          <p>Ditching the mouse for the keyboard?</p>
          <br></br>
          <p>
            just…
            <b>
              <i> lowkey</i>
            </b>
            .
          </p>
          <Button
            blur="go lowkey"
            className="sd"
            onClick={() => navigate("/tutorial")}
          /> */}
              </div>
            </div>
          </div>
      )}
          </>
        );
};

export default Intro;