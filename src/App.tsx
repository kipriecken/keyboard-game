import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Game from "./pages/Game";
import About from "./pages/About";

function App() {
  return (
    <>
      <header style={{ padding: 12 }}>
        <nav>
          <Link to="/">Keyboard Shortcuts Game</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
// }, 500);
