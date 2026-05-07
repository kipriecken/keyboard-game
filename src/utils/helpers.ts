/* eslint-disable @typescript-eslint/no-explicit-any */
import { type GameLevel } from "../data";
import type { ReactNode } from "react";
import React from "react";

export interface LabelData {
  gameTitle: string;
  levelNumber: number;
  chord: string;
  instruction: ReactNode;
}

const indexToGameTitle: Record<number, string> = {
  0: "Navigation",
  1: "Highlighting",
  2: "Deletion",
};

const modifierToKeyName: Record<string, string> = {
  alt: "option",
  meta: "command",
  shift: "shift",
  control: "control",
};

export const getLabelTitle = (
  gameIndex: number,
  levelIndex: number,
): string => {
  return `${indexToGameTitle[gameIndex]}: Level ${levelIndex + 1}`;
};

export const getLabelChord = (level: GameLevel): string => {
  let chord = "";
  level.activeKeys.forEach(
    (keyName) => (chord += `${modifierToKeyName[keyName]} + `),
  );
  level.actionKeys.forEach((key) => (chord += `${key}, `));
  chord = chord.slice(0, -2);
  return chord;
};

export const getLabelInstruction = (level: GameLevel): ReactNode => {
  return level.action
    ? `${level.action}.`
    : React.createElement(
        React.Fragment,
        null,
        "move the blinking cursor from ",
        React.createElement("strong", null, level.cursorPlacement),
        " to ",
        React.createElement("strong", null, level.newCursorPlacement),
        ".",
      );
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
