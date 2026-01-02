import "./button.css";
import ButtonSvg from "./ButtonSvg";
import { useState } from "react";

export default function Button(props: {
  focus: string;
  blur: string;
  className: string;
  onFocus?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
  isVisible?: boolean;
}) {
  const [text, setText] = useState(props.blur);
  const displayClass =
    props.isVisible === false ? "display-none" : "display-block";
  return (
    <button
      className={`${props.className} ${displayClass}`}
      disabled={props.disabled}
      id={props.id}
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
