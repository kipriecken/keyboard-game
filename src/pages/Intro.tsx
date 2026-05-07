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
            <strong>
              I used to bring so much tension to my instrument as a Classical musician, it was like I was fighting it.
            </strong>
          </p>
          <p>
            <strong>
              In reality, there was room for ease and flow.
            </strong>
          </p>
          <p>
            Becoming a software engineer showed me it was no different with the
            computer.
          </p>
          <p>
            The keys you use to type you can use to navigate your
            computer with ease.
          </p>
          <p>
            <strong>You just have to learn how.</strong>
          </p>
          <Button
            blur="Start Tutorial"
            className="sd"
            onClick={() => navigate("/tutorial")}
          />
        </div>
      </div>
    </>
  );
};

export default Intro;
