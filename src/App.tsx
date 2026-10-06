import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import { useState } from "react";
import Tutorial from "./pages/Tutorial/Tutorial";
import About from "./pages/About/About";
import Game from "./pages/Game/Game";
import Modal from "./components/Modal/Modal";
import { useModalVisibility } from "./hooks/useModalVisibility";
import useBeforeUnload from "./hooks/useBeforeUnload";
import Intro from "./pages/Intro/Intro";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useModalVisibility(setIsModalVisible);
  useBeforeUnload();

  return (
    <>
      <Modal visibility={isModalVisible}></Modal>
      <Header />
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
