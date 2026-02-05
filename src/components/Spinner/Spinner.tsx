import "./Spinner.css";

export default function Spinner(props: { isDisplayed: boolean }) {
  return (
    <div
      className="spinner"
      style={{ display: props.isDisplayed ? "flex" : "none" }}
    ></div>
  );
}
