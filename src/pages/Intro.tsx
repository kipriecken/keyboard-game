import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

const Intro = () => {
  const userAgent = window.navigator.userAgent;
  const isMac = userAgent.includes("Macintosh");
  const isSafari =
    userAgent.includes("Safari") && !userAgent.includes("Chrome");
  const navigate = useNavigate();

  return (
    <>
      <Header title="Keyboard Shortcuts Tutorial" />
      <div className="pre-game container">
        <div className="intro">
          <p
            className="safari"
            style={{ display: isSafari ? "block" : "none" }}
          >
            To play on Safari, click on Safari at the top, then &gt; Preferences
            &gt;. Check the box at Press Tab to highlight each item on a web
            page.
            <br></br>
            <br></br>
            If using an iPad, go to Settings &gt; Accessibility &gt; Keyboards &
            Typing, select Full Keyboard Access and switch on.
          </p>
          <p className="windows" style={{ display: !isMac ? "block" : "none" }}>
            Note: this game is not configured for Windows.
          </p>
        </div>
        <Button
          blur="Start Tutorial"
          className="sd"
          onClick={() => navigate("/tutorial")}
        />
      </div>
    </>
  );
};

export default Intro;
