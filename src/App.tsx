import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
