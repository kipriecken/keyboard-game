import type { LabelData } from "../../utils/helpers";

export default function Label({
  gameTitle,
  levelNumber,
  chord,
  instruction,
}: LabelData) {
  return (
    <div className="label">
      <h3>
        {gameTitle}: Level {levelNumber}
      </h3>
      <h4>
        <strong>{chord}</strong>
      </h4>
      <div>Using only the keyboard, {instruction}</div>
    </div>
  );
}
