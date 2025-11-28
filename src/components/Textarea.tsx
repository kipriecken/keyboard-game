export default function Textarea(props: {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  handleKeyup: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleKeydown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      ref={props.textareaRef}
      name="text"
      id="textarea"
      rows={5}
      cols={75}
      spellCheck="false"
      onKeyUp={props.handleKeyup}
      onKeyDown={props.handleKeydown}
    ></textarea>
  );
}
