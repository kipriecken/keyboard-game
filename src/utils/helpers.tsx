import Key from "../components/Key/Key";

export const renderKeyForChordPart = (part: string) => {
  switch (part.toLowerCase()) {
    case "option":
      return <Key id="AltLeft" label="option" dataType="word" />;
    case "command":
      return (
        <Key id="MetaLeft" label="command" className="w-129" dataType="word" />
      );
    case "shift":
      return (
        <Key
          id="ShiftLeft"
          label="shift"
          className="key-left w-242"
          dataType="word"
        />
      );
    case "control":
      return <Key id="ControlLeft" label="control" dataType="word" />;
    case "arrowleft":
      return (
        <Key id="ArrowLeft" className="key-bottom h-05" dataType="word">
          <svg className="arrow-left" width="10" height="13">
            <polygon points="0,0 10,0 5,13" fill="white" />
          </svg>
        </Key>
      );
    case "arrowright":
      return (
        <Key id="ArrowRight" className="key-bottom h-05" dataType="word">
          <svg className="arrow-right" width="10" height="13">
            <polygon points="0,0 10,0 5,13" fill="white" />
          </svg>
        </Key>
      );
    case "arrowup":
      return (
        <Key id="ArrowUp" className="key-up h-05-min" dataType="word">
          <svg className="arrow-up" width="10" height="13">
            <polygon points="0,0 10,0 5,13" fill="white" />
          </svg>
        </Key>
      );
    case "arrowdown":
      return (
        <Key
          id="ArrowDown"
          className="key-down key-bottom h-05-min"
          dataType="word"
        >
          <svg width="10" height="13">
            <polygon points="0,0 10,0 5,13" fill="white" />
          </svg>
        </Key>
      );
    case "backspace":
      return (
        <Key
          id="Backspace"
          label="delete"
          className="delete key-right w-156"
          dataType="word"
        />
      );
    case "k":
      return <Key key={`KeyK`} id={`KeyK`} label="K" dataType="char" />;
    default:
      return <Key id={`Key${part}`} label={part} dataType="char" />;
  }
};