export type GamePhase =
  | "loading"
  | "intro"
  | "introducing-key"
  | "playing"
  | "exercise-complete"
  | "track-complete"
  | "tutorial-complete";

export interface GameState {
  phase: GamePhase;
  trackIndex: number;
  exerciseIndex: number;
  keystrokes: number;
  acceptableKeys: string[];
  areRequirementsMet: boolean;
  completedTracks: number[];
}

export type GameAction =
  | { type: "LOADED" }
  | { type: "TAB_FIRST_PRESSED" } // user pressed tab for the first time, dismiss keyboard
  | { type: "KEY_INTRODUCED" } // user pressed the new key, dismiss keyboard
  | { type: "KEY_PRESSED" } // any valid keystroke, increment counter
  | { type: "REQUIREMENTS_MET" } // correct shortcut used
  | { type: "EXERCISE_WON" } // cursor landed in right place
  | { type: "NEXT_CLICKED" } // user advances
  | { type: "RESET" }; // back to beginning