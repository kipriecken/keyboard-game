import type { LabelData } from "../../utils/helpers";
import { renderKeyForChordPart } from "../../utils/helpers.tsx";
import "./Label.css";

export default function Label({
  gameTitle,
  levelNumber,
  chord,
  instruction,
}: LabelData) {
  const chordParts = Array.from(
    new Set(
      chord
        .split(/[,+]/)
        .map((part) => part.trim())
        .filter(Boolean),
    ),
  );

  return (
    <div className="label">
      <h3>
        {gameTitle}: Level {levelNumber}
      </h3>
      <div className="chord-container">
        {chordParts.map((part) => (
          <span key={part}>{renderKeyForChordPart(part)}</span>
        ))}
      </div>
      <div>Using only the keyboard, {instruction}</div>
    </div>
  );
}
