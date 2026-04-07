import { useEffect, useState } from "react";
import "./Confetti.css";

interface ConfettiProps {
  trigger: boolean;
  duration?: number; // ms before auto-hide
}

export default function Confetti({ trigger, duration = 3000 }: ConfettiProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  if (!visible) return null;

  return (
    <div className="confetti-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random() * 1.5}s`,
            backgroundColor: [
              "#9C4A3A", // burnt sienna
              "#2D5D5C", // deep teal
              "#E8C547", // gold
              "#E8F4E8", // light green
            ][Math.floor(Math.random() * 4)],
          }}
        />
      ))}
    </div>
  );
}
