import "../../App.css";

export default function About() {
  const userAgent = window.navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );

  return (
    <div className="container" style={{ padding: 16 }}>
      {!isMobile && (
        <div>
          <h1 style={{ padding: "2rem" }}>About</h1>
        </div>
      )}
      <div
        style={{
          maxWidth: 800,
          lineHeight: 1.6,
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <p>A computer screen displays visually represented code.</p>
        <p>
          To allow you to interact without being a developer, computer designers
          made the mouse.
        </p>
        <p>
          But the mouse is inexact. You move your hand (mouse) or fingertip
          (trackpad) towards your goal, often requiring more than one try to get
          there. You click, triple click, possibly clicking the wrong thing and
          having to click back. Clumsy.
        </p>
        <p>
          Awkward and unnatural adjustments make for discomfort, irritability,
          shoulder/neck/back tension. The strain and effort takes their toll
          over long periods.
        </p>
        <h3>Keyboard shortcuts to the rescue</h3>
        <p>
          With keyboard shortcuts you tell the computer precisely what you want.
          Each keyboard key press corresponds to precise code.
        </p>
        <p>
          This game teaches several of the most useful keyboard shortcuts and
          shows you how to use them in your daily work. Possible benefits
          include: smoother workflow, better hand and wrist health, and
          increased peace of mind.
        </p>
        <p>Good luck and have fun.</p>

        <p>— Kip Riecken, Creator</p>

        <p>P.S. - If you need to navigate out, use tab</p>
      </div>
    </div>
  );
}
