import "./Header.css";

export default function Header(props: { visibility: string }) {
  return (
    <div
      className="header"
      style={{ visibility: props.visibility ? "hidden" : "visible" }}
    >
      <h3>Keyboard Shortcuts Game</h3>
    </div>
  );
}
