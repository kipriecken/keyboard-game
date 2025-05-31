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

// State
let labelText = "";
let levelIndex = 0;
let keystrokes = 0;
let areRequirementsMet = false;
let isLevelOver = false;

// Fetch data
const levelsData = window.levels;

const modifierToKeyName = {
  alt: ["option", "alt"],
  meta: ["command", "windows"],
  shift: ["shift", "shift"],
  control: ["control", "control"],
};

isMobile
  ? (mainDiv.style.display = "none")
  : (mobileDiv.style.display = "none");

const generateLabelText = (levelIndex) => {
  level = levelsData[levelIndex];
  let chord = "";
  level.activeKeys.map((keyName) =>
    isMac
      ? (chord += `${modifierToKeyName[keyName][0]} + `)
      : (chord += `${modifierToKeyName[keyName][1]} + `)
  );
  level.actionKeys.map((key) => (chord += `${key} + `));
  chord = chord.slice(0, -3);
  labelText = `<h3>Level ${levelIndex + 1}</h3>
        <h4><strong>${chord}</strong></h4>
        <div>Use these keys to ${level.action} with the text-cursor at ${
    level.cursorPlacement
  }.</div>`;
};

if (isSafari) {
  safari.style.display = "block";
}

const prepareTextArea = (levelIndex) => {
  const level = levelsData[levelIndex];
  generateLabelText(levelIndex);
  label.innerHTML = labelText;
  textarea.value = text;
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
  if (levelIndex == levelsData.length - 1) {
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

  const level = levelsData[levelIndex];

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
  achieved.innerText = `Achieved level ${levelIndex + 1}!`;
  isLevelOver = true;
  achieved.style.display = "block";
  if (keystrokes == minKeystrokes) {
    keystrokesText.style.visibility = "visible";
  }
  if (levelIndex !== levelsData.length - 1) {
    nextBtn.disabled = false;
  } else {
    offerMonkeyGame();
  }
};

textarea.addEventListener("keyup", () => {
  if (!areRequirementsMet) {
    return;
  }
  const level = levelsData[levelIndex];
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
