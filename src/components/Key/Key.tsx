import type { ReactNode } from "react";
import "../Keyboard/Keyboard.css";

interface KeyProps {
  id?: string;
  label?: string;
  className?: string;
  dataType?: "char" | "word";
  children?: ReactNode;
}

export default function Key({
  id,
  label,
  className = "",
  dataType,
  children,
}: KeyProps) {
  return (
    <div className={`key ${className}`.trim()} id={id} data-type={dataType}>
      {children || label}
    </div>
  );
}
