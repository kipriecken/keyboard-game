/* eslint-disable @typescript-eslint/no-explicit-any */
import { type GameLevel } from "../data";

export const populateLabel = (
  level: GameLevel,
  gameIndex: number,
  levelIndex: number,
): string => {
  const indexToGameTitle: any = {
    0: "Navigation",
    1: "Highlighting",
    2: "Deletion",
  };

  const modifierToKeyName: any = {
    alt: "option",
    meta: "command",
    shift: "shift",
    control: "control",
  };
  let chord = "";
  level.activeKeys.map(
    (keyName) => (chord += `${modifierToKeyName[keyName]} + `),
  );
  level.actionKeys.map((key) => (chord += `${key}, `));
  chord = chord.slice(0, -2);
  return `
        <h3>${indexToGameTitle[gameIndex]}: Level ${levelIndex + 1}</h3>
        <h4><strong>${chord}</strong></h4>
        <div>Using only the keyboard, ${
          level.action
            ? `${level.action}.`
            : `move the blinking cursor from ${level.cursorPlacement} to ${level.newCursorPlacement}.`
        }</div>`;
};

export const areActiveKeysPressed = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  activeKeys: string[],
) => {
  return (
    activeKeys.includes("alt") == e.altKey &&
    activeKeys.includes("shift") == e.shiftKey &&
    activeKeys.includes("control") == e.ctrlKey &&
    activeKeys.includes("meta") == e.metaKey
  );
};
