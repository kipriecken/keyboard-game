import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(props: { title: string; hidden?: boolean }) {
  return (
    <header style={{ padding: 12 }}>
      <nav>
        <Link to="/">{props.title}</Link>
        <Link
          to="/about"
          style={{ visibility: props.hidden ? "hidden" : "visible" }}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
