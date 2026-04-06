import { useEffect, useRef } from "react";
import Key from "../Key/Key";
import "./Keyboard.css";

interface KeyboardProps {
  newKey: string;
  isDisplayed: boolean;
}

export default function Keyboard({ newKey, isDisplayed }: KeyboardProps) {
  const keyboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = document.getElementById(newKey);
    if (element) {
      element.classList.add("new-key");
    }
  }, [newKey]);

  return (
    <div
      className="container"
      id="keyboard"
      style={{
        display: newKey && isDisplayed ? "flex" : "none",
      }}
      ref={keyboardRef}
    >
      <div className="keyboard">
        {/* Row 1 */}
        <div className="keyboard-row keyboard-row-top h-068">
          <Key id="Escape" label="esc" className="key-left" dataType="word" />
          <Key className="touch-bar w-1418" />
          <Key id="power" className="power w-068" />
        </div>

        {/* Row 2 */}
        <div className="keyboard-row">
          <Key id="Backquote" label="`" dataType="char" />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
            <Key
              key={`Digit${n}`}
              id={`Digit${n}`}
              label={n.toString()}
              dataType="char"
            />
          ))}
          <Key id="Minus" label="-" dataType="char" />
          <Key id="Equal" label="=" dataType="char" />
          <Key
            id="Backspace"
            label="delete"
            className="delete key-right w-156"
            dataType="word"
          />
        </div>

        {/* Row 3 */}
        <div className="keyboard-row">
          <Key
            id="Tab"
            label="tab"
            className="delete key-left w-156"
            dataType="word"
          />
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((char) => (
            <Key
              key={`Key${char}`}
              id={`Key${char}`}
              label={char}
              dataType="char"
            />
          ))}
          <Key id="BracketLeft" label="[" dataType="char" />
          <Key id="BracketRight" label="]" dataType="char" />
          <Key id="Backslash" label="\" dataType="char" />
        </div>

        {/* Row 4 */}
        <div className="keyboard-row">
          <Key
            id="CapsLock"
            label="caps lock"
            className="key-left w-185"
            dataType="word"
          />
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((char) => (
            <Key
              key={`Key${char}`}
              id={`Key${char}`}
              label={char}
              dataType="char"
            />
          ))}
          <Key id="Semicolon" label=";" dataType="char" />
          <Key id="Quote" label="'" dataType="char" />
          <Key
            id="Enter"
            label="return"
            className="key-right w-185"
            dataType="word"
          />
        </div>

        {/* Row 5 */}
        <div className="keyboard-row">
          <Key
            id="ShiftLeft"
            label="shift"
            className="key-left w-242"
            dataType="word"
          />
          {["Z", "X", "C", "V", "B", "N", "M"].map((char) => (
            <Key
              key={`Key${char}`}
              id={`Key${char}`}
              label={char}
              dataType="char"
            />
          ))}
          <Key id="Comma" label="," dataType="char" />
          <Key id="Period" label="." dataType="char" />
          <Key id="Slash" label="/" dataType="char" />
          <Key
            id="ShiftRight"
            label="shift"
            className="key-right w-242"
            dataType="word"
          />
        </div>

        {/* Row 6 */}
        <div className="keyboard-row">
          <Key className="key-right" label="fn" dataType="word" />
          <Key id="ControlLeft" label="control" dataType="word" />
          <Key id="AltLeft" label="option" dataType="word" />
          <Key
            id="MetaLeft"
            label="command"
            className="w-129"
            dataType="word"
          />
          <Key id="Space" className="w-551" />
          <Key
            id="MetaRight"
            label="command"
            className="w-129"
            dataType="word"
          />
          <Key id="AltRight" label="option" dataType="word" />

          {/* Arrow keys */}
          <Key id="ArrowLeft" className="key-bottom h-05" dataType="word">
            <svg className="arrow-left" width="10" height="13">
              <polygon points="0,0 10,0 5,13" fill="white" />
            </svg>
          </Key>

          <div className="key key-group">
            <Key id="ArrowUp" className="key-up h-05-min" dataType="word">
              <svg className="arrow-up" width="10" height="13">
                <polygon points="0,0 10,0 5,13" fill="white" />
              </svg>
            </Key>
            <Key
              id="ArrowDown"
              className="key-down key-bottom h-05-min"
              dataType="word"
            >
              <svg width="10" height="13">
                <polygon points="0,0 10,0 5,13" fill="white" />
              </svg>
            </Key>
          </div>

          <Key id="ArrowRight" className="key-bottom h-05" dataType="word">
            <svg className="arrow-right" width="10" height="13">
              <polygon points="0,0 10,0 5,13" fill="white" />
            </svg>
          </Key>
        </div>
      </div>
    </div>
  );
}
