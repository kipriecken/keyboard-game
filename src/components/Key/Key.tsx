import type { ReactNode } from "react";
import "../Keyboard/Keyboard.css";

interface KeyProps {
  id?: string;
  label?: string;
  className?: string;
  dataType?: "char" | "word";
  isPressed?: boolean;
  children?: ReactNode;
}

export default function Key({
  id,
  label,
  className = "",
  dataType,
  isPressed = false,
  children,
}: KeyProps) {
  return (
    <div
      className={`key ${className} ${isPressed ? "pressed" : ""}`.trim()}
      id={id}
      data-type={dataType}
    >
      {children || label}
    </div>
  );
}
