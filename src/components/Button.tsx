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
  const [name, setName] = useState(props.blur);
  return (
    <button
      className={props.className}
      onFocus={() => {
        setName(props.focus);
        if (props.onFocus) {
          props.onFocus();
        }
      }}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}
      onBlur={() => setName(props.blur)}
    >
      <ButtonSvg></ButtonSvg>
      <span className={`${props.className}-span`}>{name}</span>
    </button>
  );
}
