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
      <div className="intro">
        <p className="safari" style={{ display: isSafari ? "block" : "none" }}>
          To play on Safari, click on Safari at the top, then &gt; Preferences
          &gt;. Check the box at Press Tab to highlight each item on a web page.
          <br></br>
          <br></br>
          If using an iPad, go to Settings &gt; Accessibility &gt; Keyboards &
          Typing, select Full Keyboard Access and switch on.
        </p>
        <p className="windows" style={{ display: !isMac ? "block" : "none" }}>
          Note: this game is not configured for Windows.
        </p>
        <p>
          After years feeling like I was fighting my instrument as Classical
          musician, I realized I didn't have to. I could learn to work with it
          instead of against it.
        </p>
        <p>
          {" "}
          I want to help you do the same with your computer. If you feel like
          you're fighting your computer, this game is for you.
        </p>
        <p>
          This game will teach you how to use keyboard shortcuts to edit text.
          Prepare to tread lightly!
        </p>
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
