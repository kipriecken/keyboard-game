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
        display: props.newKey && props.isDisplayed ? "flex" : "none",
      }}
      ref={keyboardRef}
    >
      <div className="keyboard">
        <div className="keyboard-row keyboard-row-top h-068">
          <div className="key key-left" id="Escape" data-type="word">
            esc
          </div>
          <div className="key touch-bar w-1418"></div>
          <div className="key power w-068"></div>
        </div>
        <div className="keyboard-row">
          <div className="key" id="Backquote" data-type="char">
            `
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
            <div
              className="key"
              id={`Digit${n}`}
              key={`Digit${n}`}
              data-type="char"
            >
              {n}
            </div>
          ))}
          <div className="key" id="Minus" data-type="char">
            -
          </div>
          <div className="key" id="Equal" data-type="char">
            =
          </div>
          <div
            className="key delete key-right w-156"
            id="Backspace"
            data-type="word"
          >
            delete
          </div>
        </div>
        <div className="keyboard-row">
          <div className="key delete key-left w-156" id="Tab" data-type="word">
            tab
          </div>
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((char) => (
            <div
              className="key"
              id={`Key${char}`}
              key={`Key${char}`}
              data-type="char"
            >
              {char}
            </div>
          ))}
          <div className="key" id="BracketLeft" data-type="char">
            [
          </div>
          <div className="key" id="BracketRight" data-type="char">
            ]
          </div>
          <div className="key" id="Backslash" data-type="char">
            \
          </div>
        </div>
        <div className="keyboard-row">
          <div className="key key-left w-185" id="Escape" data-type="word">
            caps lock
          </div>
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((char) => (
            <div
              className="key"
              id={`Key${char}`}
              key={`Key${char}`}
              data-type="char"
            >
              {char}
            </div>
          ))}
          <div className="key" id="Semicolon" data-type="char">
            ;
          </div>
          <div className="key" id="Quote" data-type="char">
            '
          </div>
          <div className="key key-right w-185" id="Enter" data-type="word">
            return
          </div>
        </div>
        <div className="keyboard-row">
          <div className="key key-left w-242" id="ShiftLeft" data-type="word">
            shift
          </div>
          {["Z", "X", "C", "V", "B", "N", "M"].map((char) => (
            <div
              className="key"
              id={`Key${char}`}
              key={`Key${char}`}
              data-type="char"
            >
              {char}
            </div>
          ))}
          <div className="key" id="Comma" data-type="char">
            ,
          </div>
          <div className="key" id="Period" data-type="char">
            .
          </div>
          <div className="key" id="Slash" data-type="char">
            /
          </div>
          <div className="key key-right w-242" id="ShiftRight" data-type="word">
            shift
          </div>
        </div>
        <div className="keyboard-row">
          <div className="key key-right" data-type="word">
            fn
          </div>
          <div className="key" id="ControlLeft" data-type="word">
            control
          </div>
          <div className="key" id="AltLeft" data-type="word">
            option
          </div>
          <div className="key w-129" id="MetaLeft" data-type="word">
            command
          </div>
          <div className="key w-551" id="Space"></div>
          <div className="key w-129" id="MetaRight" data-type="word">
            command
          </div>
          <div className="key" id="AltRight" data-type="word">
            option
          </div>
          <div className="key key-bottom h-05" id="ArrowLeft">
            <svg className="arrow-left" width="10" height="13">
              <polygon points="0,0 10,0 5,13" fill="white" />
            </svg>
          </div>
          <div className="key key-group">
            <div className="key key-up h-05" id="ArrowUp">
              <svg className="arrow-up" width="10" height="13">
                <polygon points="0,0 10,0 5,13" fill="white" />
              </svg>
            </div>
            <div className="key key-down key-bottom h-05" id="ArrowDown">
              <svg width="10" height="13">
                <polygon points="0,0 10,0 5,13" fill="white" />
              </svg>
            </div>
          </div>
          <div className="key key-bottom h-05" id="ArrowRight">
            <svg className="arrow-right" width="10" height="13">
              <polygon points="0,0 10,0 5,13" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
