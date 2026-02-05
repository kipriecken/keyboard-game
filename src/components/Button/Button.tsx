import "./Button.css";
import ButtonSvg from "../ButtonSvg/ButtonSvg";
import { useState } from "react";

export default function Button(props: {
  focus?: string;
  blur: string;
  className: string;
  onFocus?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  isVisible?: boolean;
}) {
  const [text, setText] = useState(props.blur);
  const displayClass =
    props.isVisible === false ? "display-none" : "display-block";
  return (
    <button
      className={`${props.className} ${displayClass}`}
      disabled={props.disabled}
      onFocus={() => {
        if (props.focus) setText(props.focus);
        if (props.onFocus) props.onFocus();
      }}
      onClick={() => {
        if (props.onClick) props.onClick();
        setText(props.blur); // reset text on click
      }}
      onBlur={() => setText(props.blur)}
    >
      <ButtonSvg></ButtonSvg>
      <span className={`${props.className}-span`}>{text}</span>
    </button>
  );
}
