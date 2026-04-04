import { games } from "../data";
import type { GameState, GameAction } from "../types/";

export const initialState: GameState = {
  phase: "loading",
  trackIndex: 0,
  exerciseIndex: 0,
  keystrokes: 0,
  areRequirementsMet: false,
  acceptableKeys: [
    "Arrow",
    "Shift",
    "Alt",
    "Escape",
    "Meta",
    "Tab",
    "Control",
    "KeyL",
  ],
  completedTracks: [],
};

export function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "RESET":
      return {
        ...initialState,
        phase: "loading",
      };
    case "LOADED": {
      const exercise = games[state.trackIndex][state.exerciseIndex];
      const newKey = !!exercise.newKey;
      return {
        ...state,
        phase: newKey ? "introducing-key" : "playing",
        keystrokes: 0,
        areRequirementsMet: false,
      };
    }
    case "KEY_INTRODUCED":
      return {
        ...state,
        phase: "playing",
      };
    case "KEY_PRESSED":
      return {
        ...state,
        keystrokes: state.keystrokes + 1,
      };
    case "REQUIREMENTS_MET":
      return {
        ...state,
        areRequirementsMet: true,
      };
    case "NEXT_CLICKED": {
      const isLastExercise =
        state.exerciseIndex === games[state.trackIndex].length - 1;

      if (isLastExercise) {
        const nextTrackIndex = state.trackIndex + 1;
        const enteringLastTrack = nextTrackIndex === games.length - 1;
        return {
          ...state,
          trackIndex: nextTrackIndex,
          exerciseIndex: 0,
          phase: "loading",
          acceptableKeys: enteringLastTrack
            ? [...state.acceptableKeys, "Backspace", "KeyK", "KeyZ"]
            : state.acceptableKeys,
        };
      }

      return {
        ...state,
        exerciseIndex: state.exerciseIndex + 1,
        phase: "loading",
      };
    }
    case "EXERCISE_WON":
      if (
        state.trackIndex === games.length - 1 &&
        state.exerciseIndex === games[state.trackIndex].length - 1
      ) {
        return {
          ...state,
          phase: "tutorial-complete",
        };
      }
      return {
        ...state,
        phase: "exercise-complete",
      };
    default:
      return state;
  }
}
