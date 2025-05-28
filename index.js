const textarea = document.getElementById("textarea");
const editable = document.getElementById("editable");
const achieved = document.getElementsByClassName("achieved")[0];
const intro = document.getElementsByClassName("intro")[0];
const safari = document.getElementsByClassName("safari")[0];
const preGame = document.getElementsByClassName("pre-game")[0];
const focusBtn = document.getElementsByClassName("focus")[0];
const focusTooBtn = document.getElementsByClassName("focus-too")[0];
const gamePlay = document.getElementsByClassName("game-play")[0];
const monkey = document.getElementsByClassName("monkey")[0];
const monkeyBtn = document.getElementsByClassName("monkey-btn")[0];
const playBtn = document.getElementsByClassName("play")[0];
const resetBtn = document.getElementsByClassName("reset")[0];
const counter = document.getElementsByClassName("counter")[0];
const textGameContainer = document.getElementsByClassName("text-game")[0];
const bananaContainer = document.getElementsByClassName("banana")[0];
const keystrokesText = document.getElementsByClassName("keystrokes")[0];
const nextBtn = document.getElementById("next");
const mainDiv = document.getElementsByClassName("main")[0];
const mobileDiv = document.getElementsByClassName("is-mobile")[0];
const label = document.getElementsByTagName("label")[0];

const isMac = window.navigator.userAgent.includes("Macintosh");
const isSafari =
  window.navigator.userAgent.includes("Safari") &&
  !window.navigator.userAgent.includes("Chrome");
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );

// Constants
const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nSuscipit nemo odit optio architecto aperiam incidunt pariatur reiciendis ea!\nUt, id.";

// State
let labelText = "";
let levelIndex = 0;
let keystrokes = 0;
let areRequirementsMet = false;
let isLevelOver = false;

// Data
const levels = [
  {
    chord: `${isMac ? "command" : "Windows"} + left arrow`,
    action: "skip to the beginning of the line",
    cursorPlacement: "the middle",
    keyword: "Left",
    activeKeys: ["meta"],
    minKeystrokes: 2,
    startingCursorPosition: [12, 12],
  },
  {
    chord: `${isMac ? "command" : "Windows"} + right arrow`,
    action: "skip to the end of the line",
    cursorPlacement: "the beginning",
    keyword: "Right",
    activeKeys: ["meta"],
    minKeystrokes: 2,
    finalCursorLocation: [56, 56],
  },
  {
    chord: `${isMac ? "command" : "Windows"} + up arrow`,
    action: "skip to the beginning of the text",
    cursorPlacement: "the end",
    keyword: "Up",
    activeKeys: ["meta"],
    minKeystrokes: 2,
    startingCursorPosition: [141, 141],
    finalCursorLocation: [0, 0],
  },
  {
    chord: `${isMac ? "command" : "Windows"} + down arrow`,
    action: "skip to the end of the text",
    cursorPlacement: "the beginning",
    keyword: "Down",
    activeKeys: ["meta"],
    minKeystrokes: 2,
    finalCursorLocation: [141, 141],
  },
  {
    chord: `${isMac ? "option" : "alt"} + shift + right arrow`,
    action: "highlight the first word",
    cursorPlacement: "the beginning of the text",
    keyword: "Right",
    activeKeys: ["alt", "shift"],
    minKeystrokes: 3,
    finalCursorLocation: [0, 5],
  },
  {
    chord: `${isMac ? "option" : "alt"} + shift + left arrow`,
    action: "highlight the first word",
    cursorPlacement: "after the first word",
    keyword: "Left",
    activeKeys: ["alt", "shift"],
    minKeystrokes: 3,
    startingCursorPosition: [5, 5],
    finalCursorLocation: [0, 5],
  },
  {
    chord: `${isMac ? "option" : "alt"} + shift + down arrow`,
    action: "highlight the first line",
    cursorPlacement: "the beginning of the text",
    keyword: "Down",
    activeKeys: ["alt", "shift"],
    minKeystrokes: 3,
    finalCursorLocation: [0, 57],
  },
  {
    chord: `${isMac ? "option" : "alt"} + shift + up arrow`,
    action: "highlight the first line",
    cursorPlacement: "at the end of the first line",
    keyword: "Up",
    activeKeys: ["alt", "shift"],
    minKeystrokes: 3,
    startingCursorPosition: [56, 56],
    finalCursorLocation: [0, 56],
  },
  {
    chord: `${isMac ? "option" : "alt"} + delete`,
    action: "delete the first word",
    cursorPlacement: "after the first word",
    keyword: "Backspace",
    activeKeys: ["alt"],
    minKeystrokes: 2,
    startingCursorPosition: [5, 5],
    finalCursorLocation: [0, 0],
  },
  {
    chord: `${isMac ? "command" : "Windows"} + delete`,
    action: "delete the first line",
    cursorPlacement: "at the end of the first line",
    keyword: "Backspace",
    activeKeys: ["meta"],
    minKeystrokes: 2,
    startingCursorPosition: [56, 56],
    finalCursorLocation: [0, 0],
  },
  {
    chord: `control + K`,
    action: "delete the last word of the first line",
    cursorPlacement: "before the last word of the first line",
    keyword: "K",
    activeKeys: ["control"],
    minKeystrokes: 2,
    startingCursorPosition: [50, 50],
    finalCursorLocation: [50, 50],
  },
];

isMobile
  ? (mainDiv.style.display = "none")
  : (mobileDiv.style.display = "none");

const generateLabelText = (levelIndex) => {
  level = levels[levelIndex];
  labelText = `<h3>Level ${levelIndex + 1}</h3>
        <h4><strong>${level.chord}</strong></h4>
        <div>Use these keys to ${level.action} with the text-cursor at ${
    level.cursorPlacement
  }.</div>`;
};

if (isSafari) {
  safari.style.display = "block";
}

const prepareTextArea = (levelIndex) => {
  const level = levels[levelIndex];
  generateLabelText(levelIndex);
  label.innerHTML = labelText;
  textarea.value = text;
  textarea.disabled = false;
  textarea.focus();
  textarea.setSelectionRange(
    level.startingCursorPosition ? level.startingCursorPosition[0] : 0,
    level.startingCursorPosition ? level.startingCursorPosition[1] : 0
  );
};

counter.innerText = keystrokes;
prepareTextArea(levelIndex);

const handleReset = () => {
  keystrokesText.style.visibility = "hidden";
  levelIndex = 0;
  resetTextarea(levelIndex);
  isLevelOver = false;
  keystrokes = 0;
  monkeyBtn.style.display = "none";
  resetBtn.style.display = "none";
};

const resetTextarea = (level) => {
  textGameContainer.style.display = "flex";
  bananaContainer.style.display = "none";
  prepareTextArea(level);
  areRequirementsMet = false;
  nextBtn.style.display = "inline";
  nextBtn.disabled = true;
  achieved.style.display = "none";
  counter.innerText = keystrokes = 0;
  keystrokesText.style.visibility = "hidden";
};

focusBtn.addEventListener("focus", () => {
  focusBtn.innerText = "Focused!";
});
focusBtn.addEventListener("blur", () => {
  focusBtn.innerText = "Focus on me";
});
focusTooBtn.addEventListener("focus", () => {
  focusTooBtn.innerText = "Focused!";
});
focusTooBtn.addEventListener("blur", () => {
  focusTooBtn.innerText = "Focus on me too";
});

playBtn.addEventListener("focus", () => {
  playBtn.innerText = "Hit return";
});
playBtn.addEventListener("blur", () => {
  playBtn.innerText = "Focus and hit return";
});

playBtn.addEventListener("click", () => {
  intro.style.visibility = "visible";
  preGame.style.display = "none";
  gamePlay.style.display = "flex";
  handleReset();
});

nextBtn.addEventListener("click", () => {
  if (levelIndex == levels.length - 1) {
    nextBtn.disabled = true;
    return;
  }
  resetTextarea(levelIndex + 1);
  isLevelOver = false;
  levelIndex++;
});

monkeyBtn.addEventListener("click", () => {
  textGameContainer.style.display = "none";
  bananaContainer.style.display = "flex";
  editable.focus();
});

const handleTextareaKeydown = (e) => {
  if (e.repeat || isLevelOver) {
    return;
  }

  const level = levels[levelIndex];

  if (!e.code.includes("Tab") && !e.code.includes("Escape")) {
    counter.innerText = ++keystrokes;
  }
  if (
    !e.code.includes("Arrow") &&
    !e.code.includes("Backspace") &&
    !e.code.includes("KeyK")
  ) {
    return;
  }

  const areActiveKeysPressed = () => {
    return (
      level.activeKeys.includes("alt") == e.altKey &&
      level.activeKeys.includes("shift") == e.shiftKey &&
      level.activeKeys.includes("control") == e.ctrlKey &&
      level.activeKeys.includes("meta") == e.metaKey
    );
  };

  if (e.code.includes(level.keyword) && areActiveKeysPressed()) {
    areRequirementsMet = true;
  }
};

textarea.addEventListener("keydown", (e) => {
  handleTextareaKeydown(e);
});

const offerMonkeyGame = () => {
  resetBtn.style.display = "inline";
  monkeyBtn.style.display = "block";
  nextBtn.style.display = "none";
  achieved.innerText =
    achieved.innerText +
    "\n\nThank you for playing and congratulations! Please tab to the Reset button to start again.\n\nOr, try the banana challenge 🐵";
};

const handleLevelWin = (minKeystrokes) => {
  textarea.disabled = true;
  achieved.innerText = `Achieved level ${levelIndex + 1}!`;
  isLevelOver = true;
  achieved.style.display = "block";
  if (keystrokes == minKeystrokes) {
    keystrokesText.style.visibility = "visible";
  }
  if (levelIndex !== levels.length - 1) {
    nextBtn.disabled = false;
    nextBtn.focus();
  } else {
    offerMonkeyGame();
  }
};

textarea.addEventListener("keyup", () => {
  if (!areRequirementsMet) {
    return;
  }
  const level = levels[levelIndex];
  const finalCursorLocation = level.finalCursorLocation
    ? level.finalCursorLocation
    : [0, 0];

  const isCursorInPlace =
    textarea.selectionStart == finalCursorLocation[0] &&
    textarea.selectionEnd == finalCursorLocation[1];

  if (isCursorInPlace) {
    handleLevelWin(level.minKeystrokes);
  }
});
editable.addEventListener("keyup", (e) => {
  // TODO - is possible to? if editable contains &nbsp, replace it with a regular space
  const targetString =
    "I Have Cherry I Have I Have Apple I Have I Have Strawberry";
  if (editable.innerText == targetString) {
    monkey.style.display = "block";
  }
});
