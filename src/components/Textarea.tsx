import React from "react";

interface TextareaProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  handleKeyup: () => void;
  handleKeydown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const Textarea: React.FC<TextareaProps> = ({
  textareaRef,
  handleKeyup,
  handleKeydown,
  value,
}) => (
  <textarea
    ref={textareaRef}
    name="text"
    id="textarea"
    rows={5}
    cols={75}
    spellCheck="false"
    onKeyUp={handleKeyup}
    onKeyDown={handleKeydown}
    defaultValue={value}
  ></textarea>
);

export default Textarea;
