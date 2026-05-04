import { getLabelTitle, getLabelChord } from "../../utils/helpers";
import { renderKeyForChordPart } from "../../utils/helpers.tsx";
import "./Label.css";
import type { GameLevel } from "../../data.ts";

interface LabelProps {
  level: GameLevel;
  gameIndex: number;
  levelIndex: number;
}

export default function Label({ level, gameIndex, levelIndex }: LabelProps) {
  const title = getLabelTitle(gameIndex, levelIndex);
  const chord = getLabelChord(level);

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
      <h3>{title}</h3>
      <div className="chord-container">
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
      </div>
    </div>
  );
}
