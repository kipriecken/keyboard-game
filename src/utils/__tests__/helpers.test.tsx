import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { GameLevel } from "../../data";
import {
  getLabelChord,
  getLabelInstruction,
  getLabelTitle,
  areActiveKeysPressed,
} from "../helpers";

describe("helpers utilities", () => {
  it("returns the correct label title", () => {
    expect(getLabelTitle(1, 2)).toBe("Highlighting: Level 3");
  });

  it("builds a chord string from activeKeys and actionKeys", () => {
    const level: GameLevel = {
      activeKeys: ["alt", "shift"],
      actionKeys: ["ArrowRight", "ArrowRight"],
      keyword: "Right",
      cursorPlacement: "the beginning",
      newCursorPlacement: "after the first character",
      minKeystrokes: 2,
    };

    expect(getLabelChord(level)).toBe(
      "option + shift + ArrowRight, ArrowRight",
    );
  });

  it("returns action text when level.action is provided", () => {
    const level: GameLevel = {
      activeKeys: [],
      actionKeys: [],
      action: "Select the word",
      keyword: "KeyK",
      cursorPlacement: "the beginning",
      newCursorPlacement: "after the first character",
      minKeystrokes: 1,
    };

    const instruction = getLabelInstruction(level);
    expect(instruction).toBe("Select the word.");
  });

  it("returns a JSX instruction when level.action is absent", () => {
    const level: GameLevel = {
      activeKeys: [],
      actionKeys: [],
      keyword: "Right",
      cursorPlacement: "the beginning",
      newCursorPlacement: "after the first character",
      minKeystrokes: 1,
    };

    render(<>{getLabelInstruction(level)}</>);
    expect(
      screen.getByText("Move the blinking cursor from", { exact: false }),
    ).toBeDefined();
    expect(screen.getByText("the beginning")).toBeDefined();
    expect(screen.getByText("after the first character")).toBeDefined();
  });

  it("returns true when the required modifier keys are pressed", () => {
    const event = {
      altKey: true,
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
    } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;

    expect(areActiveKeysPressed(event, ["alt"])).toBe(true);
  });

  it("returns false when the required modifier keys are not pressed", () => {
    const event = {
      altKey: false,
      shiftKey: false,
      ctrlKey: false,
      metaKey: false,
    } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;

    expect(areActiveKeysPressed(event, ["alt"])).toBe(false);
  });
});
