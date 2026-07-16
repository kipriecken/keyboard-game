import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { useState } from "react";
import Tutorial from "./pages/Tutorial";
import About from "./pages/About";
import Game from "./pages/Game";
import Modal from "./components/Modal/Modal";
import { useModalVisibility } from "./hooks/useModalVisibility";
import useBeforeUnload from "./hooks/useBeforeUnload";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useModalVisibility(setIsModalVisible);
  useBeforeUnload();

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
