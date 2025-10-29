import { useEffect, useRef } from "react";
import "./keyboard.css";

export default function Keyboard(props: {
  newKey: string;
  isDisplayed: boolean;
}) {
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newKey = document.getElementById(props.newKey);
    if (newKey) {
      newKey.style.background = "#bac244";
      newKey.style.animation = "pulse 1s ease-in-out infinite";
    }
  }, [props.newKey]);
  return (
    <div
      className="container"
      id="keyboard"
      style={{
        display: props.newKey && props.isDisplayed ? "block" : "none",
      }}
      ref={keyboardRef}
    >
      <div className="keyboard">
        <div className="keyboard-row keyboard-row-top">
          <div className="key esc key-left key-text" id="Escape">
            esc
          </div>
          <div className="key touch-bar"></div>
          <div className="key power"></div>
        </div>
        <div className="keyboard-row">
          <div className="key" id="Backquote">
            `
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
            <div className="key" id={`Digit${n}`} key={`Digit${n}`}>
              {n}
            </div>
          ))}
          <div className="key" id="Minus">
            -
          </div>
          <div className="key" id="Equal">
            =
          </div>
          <div className="key delete key-right key-text" id="Backspace">
            delete
          </div>
        </div>
        <div className="keyboard-row">
          <div className="key delete key-left key-text" id="Tab">
            tab
          </div>
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((char) => (
            <div className="key" id={`Key${char}`} key={`Key${char}`}>
              {char}
            </div>
          ))}
          <div className="key" id="BracketLeft">
            [
          </div>
          <div className="key" id="BracketRight">
            ]
          </div>
          <div className="key" id="Backslash">
            \
          </div>
        </div>
        <div className="keyboard-row">
          <div className="key return key-left key-text" id="Escape">
            caps lock
          </div>
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((char) => (
            <div className="key" id={`Key${char}`} key={`Key${char}`}>
              {char}
            </div>
          ))}
          <div className="key" id="Semicolon">
            ;
          </div>
          <div className="key" id="Quote">
            '
          </div>
          <div className="key return key-right key-text" id="Enter">
            return
          </div>
        </div>
        <div className="keyboard-row">
          <div className="key shift key-left key-text" id="ShiftLeft">
            shift
          </div>
          {["Z", "X", "C", "V", "B", "N", "M"].map((char) => (
            <div className="key" id={`Key${char}`} key={`Key${char}`}>
              {char}
            </div>
          ))}
          <div className="key" id="Comma">
            ,
          </div>
          <div className="key" id="Period">
            .
          </div>
          <div className="key" id="Slash">
            /
          </div>
          <div className="key shift key-right key-text" id="ShiftRight">
            shift
          </div>
        </div>
        <div className="keyboard-row">
          <div className="key key-right key-text">fn</div>
          <div className="key key-text" id="ControlLeft">
            control
          </div>
          <div className="key key-text" id="AltLeft">
            option
          </div>
          <div className="key command key-text" id="MetaLeft">
            command
          </div>
          <div className="key spacebar key-text" id="Space"></div>
          <div className="key command key-text" id="MetaRight">
            command
          </div>
          <div className="key key-text" id="AltRight">
            option
          </div>
          <div className="key key-arrow key-bottom" id="ArrowLeft">
            <svg className="arrow-left" width="10" height="13">
              <polygon points="0,0 10,0 5,13" fill="white" />
            </svg>
          </div>
          <div className="key key-group">
            <div className="key key-up" id="ArrowUp">
              <svg className="arrow-up" width="10" height="13">
                <polygon points="0,0 10,0 5,13" fill="white" />
              </svg>
            </div>
            <div className="key key-down key-bottom" id="ArrowDown">
              <svg width="10" height="13">
                <polygon points="0,0 10,0 5,13" fill="white" />
              </svg>
            </div>
          </div>
          <div className="key key-arrow key-bottom" id="ArrowRight">
            <svg className="arrow-right" width="10" height="13">
              <polygon points="0,0 10,0 5,13" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
