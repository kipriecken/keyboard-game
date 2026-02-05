import "./Modal.css";

export default function Modal(props: { visibility: boolean }) {
  return (
    <div
      className="modal"
      style={{ display: props.visibility ? "flex" : "none" }}
    >
      <div className="warning">Use tab to navigate back to the page</div>
    </div>
  );
}
