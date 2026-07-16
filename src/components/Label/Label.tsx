import {
  getLabelChord,
  getLabelInstruction,
} from "../../utils/helpers";
import { renderKeyForChordPart } from "../../utils/helpers.tsx";
import "./Label.css";
import type { GameLevel } from "../../data.ts";

interface LabelProps {
  level: GameLevel;
}

export default function Label({ level }: LabelProps) {
  const chord = getLabelChord(level);
  const instruction = getLabelInstruction(level);

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
      <p>
        Use{" "}
        <span className="chord-container">
          {chordParts.flatMap((part, index) => {
            const elements = [
              <span key={part}>{renderKeyForChordPart(part)}</span>,
            ];
            if (index < chordParts.length - 1) {
              elements.push(
                <span key={`sep-${index}`} style={{ fontSize: "36px" }}>
                  {" "}
                  +{" "}
                </span>,
              );
            }
            return elements;
          })}
        </span>{" "}
        to {instruction}
      </p>
    </div>
  );
}