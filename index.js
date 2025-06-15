const textarea = document.getElementById("textarea");
const editable = document.getElementById("editable");
const achieved = document.getElementsByClassName("achieved")[0];
const intro = document.getElementsByClassName("intro")[0];
const partTwo = document.getElementsByClassName("part-two")[0];
const partThree = document.getElementsByClassName("part-three")[0];
const safari = document.getElementsByClassName("safari")[0];
const preGame = document.getElementsByClassName("pre-game")[0];
const windows = document.getElementsByClassName("windows")[0];
const focusBtn = document.getElementsByClassName("focus")[0];
const focusTooBtn = document.getElementsByClassName("focus-too")[0];
const gamePlay = document.getElementsByClassName("game-play")[0];
const monkey = document.getElementsByClassName("monkey")[0];
const monkeyBtn = document.getElementsByClassName("monkey-btn")[0];
const playBtn = document.getElementsByClassName("play")[0];
const resetBtn = document.getElementsByClassName("reset")[0];
const keystrokesCounter = document.getElementsByClassName("counter")[0];
const innerContainer = document.getElementsByClassName("inner")[0];
const bananaContainer = document.getElementsByClassName("banana")[0];
const keystrokesText = document.getElementsByClassName("keystrokes")[0];
const nextBtn = document.getElementById("next");
const mainDiv = document.getElementsByClassName("main")[0];
const mobileDiv = document.getElementsByClassName("is-mobile")[0];
const label = document.getElementsByTagName("label")[0];

const userAgent = window.navigator.userAgent;
const isMac = userAgent.includes("Macintosh");
const isSafari = userAgent.includes("Safari") && !userAgent.includes("Chrome");
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );

// Constants
const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nSuscipit nemo odit optio architecto aperiam incidunt pariatur reiciendis ea!\nUt, id.";

// Fetch data
const levelsData = window.games;

// State
let labelText = "";
let gameIndex = 0;
let levelIndex = 0;
let keystrokes = 0;
let areRequirementsMet = false;
let isLevelOver = false;

const indexToGameTitle = {
  0: "Navigation",
  1: "Highlighting",
  2: "Deletion",
};

const modifierToKeyName = {
  alt: "option",
  meta: "command",
  shift: "shift",
  control: "control",
};

isMobile
  ? (mainDiv.style.display = "none")
  : (mobileDiv.style.display = "none");

if (!isMac) windows.style.display = "block";

const populateLabel = (level) => {
  let chord = "";
  level.activeKeys.map(
    (keyName) => (chord += `${modifierToKeyName[keyName]} + `)
  );
  level.actionKeys.map((key) => (chord += `${key} + `));
  chord = chord.slice(0, -3);
  labelText = `
        <h3>${indexToGameTitle[gameIndex]}: Level ${levelIndex + 1}</h3>
        <h4><strong>${chord}</strong></h4>
        <div>Use these keys to ${level.action} with the text-cursor at ${
    level.cursorPlacement
  }.</div>`;
  label.innerHTML = labelText;
};

if (isSafari) {
  safari.style.display = "block";
}
const prepareTextarea = (level) => {
  textarea.style.display = "block";
  textarea.value = text;
  textarea.focus();
  textarea.setSelectionRange(
    level.startingCursorPosition ? level.startingCursorPosition[0] : 0,
    level.startingCursorPosition ? level.startingCursorPosition[1] : 0
  );
};

let isOnFinalLevel = () => levelIndex == levelsData[gameIndex].length - 1;
let isOnFinalGame = () => gameIndex == levelsData.length - 1;

const updateLevel = () => {
  const level = levelsData[gameIndex][levelIndex];
  populateLabel(level);
  prepareTextarea(level);
};

keystrokesCounter.innerText = keystrokes;
updateLevel();

const handleReset = () => {
  keystrokesText.style.visibility = "hidden";
  gameIndex = 0;
  levelIndex = 0;
  resetTextarea();
  isLevelOver = false;
  keystrokes = 0;
  monkeyBtn.style.display = "none";
  resetBtn.style.display = "none";
};

const resetTextarea = () => {
  innerContainer.style.display = "flex";
  bananaContainer.style.display = "none";
  updateLevel();
  areRequirementsMet = false;
  nextBtn.style.display = "inline";
  nextBtn.disabled = true;
  achieved.style.display = "none";
  keystrokesCounter.innerText = keystrokes = 0;
  keystrokesText.style.visibility = "hidden";
};

focusBtn.addEventListener("focus", () => {
  partTwo.style.display = "block";
});
focusTooBtn.addEventListener("focus", () => {
  partThree.style.display = "block";
});

playBtn.addEventListener("click", () => {
  intro.style.visibility = "visible";
  preGame.style.display = "none";
  gamePlay.style.display = "flex";
  handleReset();
});

nextBtn.addEventListener("click", () => {
  if (isOnFinalLevel()) {
    if (isOnFinalGame()) {
      gameIndex = 0; // not sure if should be done here or later
      nextBtn.disabled = true;
      return;
    }
    ++gameIndex;
    levelIndex = 0;
  } else {
    ++levelIndex;
  }
  resetTextarea();
  isLevelOver = false;
});

monkeyBtn.addEventListener("click", () => {
  innerContainer.style.display = "none";
  bananaContainer.style.display = "flex";
  editable.focus();
});

const handleTextareaKeydown = (e) => {
  if (e.repeat || isLevelOver) {
    return;
  }

  const level = levelsData[gameIndex][levelIndex];

  if (!e.code.includes("Tab") && !e.code.includes("Escape")) {
    keystrokesCounter.innerText = ++keystrokes;
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
  achieved.innerText = `Achieved level ${levelIndex + 1}!`;
  isLevelOver = true;
  achieved.style.display = "block";
  if (keystrokes == minKeystrokes) {
    keystrokesText.style.visibility = "visible";
  }
  if (isOnFinalLevel() && isOnFinalGame()) {
    offerMonkeyGame();
  } else {
    nextBtn.disabled = false;
  }
};

textarea.addEventListener("keyup", () => {
  if (!areRequirementsMet) {
    return;
  }
  const level = levelsData[gameIndex][levelIndex];
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
