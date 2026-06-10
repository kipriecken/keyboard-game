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
      <Header title="lowkey" />
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
            Using a computer… lowkey{" "}
            <b>
              <i>stressful</i>
            </b>
            .
          </p>
          <p>
            Reaching for the mouse all day… highkey{" "}
            <b>
              <i>tiring</i>.
            </b>
          </p>
          {/* <hr
            style={{ borderColor: "rgba(255,255,255,0.5)", width: "100%" }}
          ></hr> */}
          <br />
          <p>Ditching the mouse for the keyboard?</p>
          <br></br>
          <p>
            just…
            <b>
              <i> lowkey</i>
            </b>
            .
          </p>
          <Button
            blur="go lowkey"
            className="sd"
            onClick={() => navigate("/tutorial")}
          />
        </div>
      </div>
    </>
  );
};

export default Intro;
