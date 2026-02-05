import Textarea from "../components/Textarea";
import { useEffect, useRef, useState } from "react";

export default function Game() {
  const [keystrokes, setKeystrokes] = useState(0);
  const [isLevelOver, setIsLevelOver] = useState(false);
  const [finalMessage, setFinalMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const successMessage =
    "Level completed using the fewest keystrokes! Excellent work!";
  const failureMessage =
    "Level complete! You used ${keystrokes} keystrokes. You only need ${minKeystrokes}. Try to do better next time!";
  const championMessage =
    "Incredible! You used fewer keystrokes than the minimum possible! Did you cheat?";

  // Data
  const startingText =
    "There is an extra word at the end of this textarea. Remove it using the fewest keystrokes possible. Banana";
  const finalText =
    "There is an extra word at the end of this textarea. Remove it using the fewest keystrokes possible.";
  const minKeystrokes = 4;

  const textarea = textareaRef.current;
  useEffect(() => {
    window.setTimeout(() => {
      if (textarea) {
        textarea.value = startingText;
        textarea.focus();
      }
    }, 1);
  }, [textarea]);

  const acceptableKeys = [
    "Arrow",
    "Shift",
    "Alt",
    "Escape",
    "Meta",
    "Tab",
    "Control",
    "Backspace",
    "KeyK",
    "KeyZ",
    "KeyL",
  ];

  const handleKeyup = () => {
    // Could just place a function in here to analyze texts, doesn't have to be just for deleting
    if (textarea?.value.trim() === finalText.trim()) {
      setIsLevelOver(true);
      textarea.readOnly = true;
      if (keystrokes == minKeystrokes) {
        setFinalMessage(successMessage);
      } else if (keystrokes < minKeystrokes) {
        setFinalMessage(championMessage);
      } else {
        setFinalMessage(
          failureMessage
            .replace("${keystrokes}", keystrokes.toString())
            .replace("${minKeystrokes}", minKeystrokes.toString()),
        );
      }
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!acceptableKeys.some((key) => e.code.includes(key))) {
      e.preventDefault();
      return;
    }
    if (e.repeat || isLevelOver) {
      return;
    }

    if (!e.code.includes("Tab") && !e.code.includes("Escape")) {
      setKeystrokes((s) => s + 1);
    }
    if (
      !e.code.includes("Arrow") &&
      !e.code.includes("Backspace") &&
      !e.code.includes("KeyK")
    ) {
      return;
    }
  };

  return (
    <div className="container" style={{ padding: 16 }}>
      <div
        className="container"
        style={{
          flexDirection: "column",
          maxWidth: 800,
          lineHeight: 1.6,
          textAlign: "left",
          paddingTop: "10rem",
        }}
      >
        <Textarea
          textareaRef={textareaRef}
          handleKeyup={handleKeyup}
          handleKeydown={handleKeydown}
          value={startingText}
        />
        <div
          className="container"
          style={{ background: "lightblue", padding: 8, marginTop: 16 }}
        >
          Keystrokes used: {keystrokes}
        </div>
        <div
          className="container"
          style={{
            maxWidth: 550,
            background: "lightgray",
            marginTop: 16,
            textAlign: "center",
            color: "#cc2d00",
          }}
        >
          {finalMessage}
        </div>
      </div>
    </div>
  );
}
