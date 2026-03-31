import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        blur="Start Tutorial"
        className="sd"
        onClick={() => navigate("/tutorial")}
      />
    </>
  );
};

export default Intro;
