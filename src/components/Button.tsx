import "./button.css";
import ButtonSvg from "./ButtonSvg";
import { useState } from "react";

export default function Button(props: {
  focus: string;
  blur: string;
  className: string;
  onFocus?: () => void;
  onClick?: () => void;
}) {
  const [text, setText] = useState(props.blur);
  return (
    <button
      className={props.className}
      onFocus={() => {
        setText(props.focus);
        if (props.onFocus) {
          props.onFocus();
        }
      }}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
      onBlur={() => setText(props.blur)}
    >
      <ButtonSvg></ButtonSvg>
      <span className={`${props.className}-span`}>{text}</span>
    </button>
  );
}
