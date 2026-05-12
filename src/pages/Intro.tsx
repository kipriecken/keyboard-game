import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import "./Intro.css";

const Intro = () => {
  const userAgent = window.navigator.userAgent;
  const isMac = userAgent.includes("Macintosh");
  const isSafari =
    userAgent.includes("Safari") && !userAgent.includes("Chrome");
  const navigate = useNavigate();

  return (
    <>
      <Header title="Keyboard Shortcuts Tutorial" />
      <div className="card">
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
          <p>
            Learning to navigate the computer as a software engineer after
            working on my relationship to the viola as a professional Classical
            musician showed me the two are strikingly similar.
          </p>
          <p>
            A key to navigating your computer with ease is learning how the keys
            you use to type can prevent tension and promote flow.
          </p>
          <p>
            <strong>You just have to learn.</strong>
          </p>
          <Button
            blur="Start Your Journey"
            className="sd"
            onClick={() => navigate("/tutorial")}
          />
        </div>
      </div>
    </>
  );
};

export default Intro;
