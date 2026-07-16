import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import Tutorial from "./pages/Tutorial";
import About from "./pages/About";
import Game from "./pages/Game";
import Modal from "./components/Modal/Modal";
import { useModalVisibility } from "./hooks/useModalVisibility";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useModalVisibility(setIsModalVisible);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  });

  return (
    <>
      <Modal visibility={isModalVisible}></Modal>
      <Header />
      <Routes>
        <Route path="/" element={<Tutorial />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
