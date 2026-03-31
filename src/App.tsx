import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Intro from "./pages/Intro";
import Tutorial from "./pages/Tutorial";
import About from "./pages/About";
import Game from "./pages/Game";
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const setModalVisible = () => {
      setIsModalVisible(true);
    };
    const setModalInvisible = () => {
      setIsModalVisible(false);
    };
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("blur", setModalVisible);
    window.addEventListener("focus", setModalInvisible);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("blur", setModalVisible);
      window.removeEventListener("focus", setModalInvisible);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Modal visibility={isModalVisible}></Modal>
      <header style={{ padding: 12 }}>
        <nav>
          <Link to="/">Keyboard Shortcuts Tutorial</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
