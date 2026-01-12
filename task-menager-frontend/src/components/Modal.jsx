import ReactDom from "react-dom";
import "./Modal.css";

function Modal ({ title, content, show, onClose, onConfirm, confirmText = "Conferma"}) {

  if(!show) return null;

  return ReactDom.createPortal(
    <div className="modal-overtlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" on Click={onClose}>Annula</button>
          <button className="btn-confirm" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal