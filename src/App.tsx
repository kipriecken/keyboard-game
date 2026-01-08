import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Tutorial from "./pages/Tutorial";
import About from "./pages/About";
import Game from "./pages/Game";

function App() {
  return (
    <>
      <header style={{ padding: 12 }}>
        <nav>
          <Link to="/">Keyboard Shortcuts Tutorial</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Tutorial />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
