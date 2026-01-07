import "../App.css";

export default function About() {
  return (
    <div className="container" style={{ padding: 16 }}>
      <h1 style={{ padding: "2rem" }}>About</h1>
      <div style={{ maxWidth: 800, lineHeight: 1.6, textAlign: "left" }}>
        <h3>Why you need keyboard shortcuts</h3>

        <p>
          What you see on a computer screen is just visually represented code.
          To make these imaginary visuals accessible, computer designers from
          decades ago gave us the mouse.
        </p>
        <p>
          Using the mouse, though, is inexact. You move your hand (mouse) or
          fingertip (trackpad) towards your goal. You click, triple click,
          possibly click the wrong thing, click back, etc. A very clumsy way to
          operate.
        </p>
        <p>
          These awkward and unnatural adjustments we make when we use a mouse
          could lead to discomfort, irritability, shoulder/neck/back tension.
          It’s guesswork, like walking on a rope bridge instead of an arch
          bridge. It requires effort, and builds up especially over long periods
          of computer use.
        </p>

        <p>
          With keyboard shortcuts you’re telling the computer precisely what you
          want. Each keyboard key press corresponds to unique code the computer
          runs.
        </p>
        <p>
          This game will familiarize you with several of the most useful
          keyboard shortcuts, and show you how to use them in your daily work
          Possible benefits include: smoother workflow, better hand and wrist
          health, increased peace of mind.
        </p>
        <p>Good luck and have fun!</p>

        <p>— Kip Riecken, Creator</p>

        <p>P.S. - If you need to navigate out, use tab</p>
      </div>
    </div>
  );
}
