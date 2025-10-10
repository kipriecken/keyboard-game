import "./button.css";
import ButtonSvg from "./ButtonSvg";
import { useState } from "react";

export default function Button(props: {
  focus: string;
  blur: string;
  className: string;
}) {
  const [name, setName] = useState(props.blur);
  return (
    <button
      className={props.className}
      onFocus={() => setName(props.focus)}
      onBlur={() => setName(props.blur)}
    >
      <ButtonSvg></ButtonSvg>
      <span className={`${props.className}-span`}>{name}</span>
    </button>
  );
}
