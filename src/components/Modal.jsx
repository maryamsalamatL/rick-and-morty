import { XCircleIcon } from "@heroicons/react/24/outline";

export default function Modal({ title, onClose, children }) {
    
  return (
    <div>
      <div className="backdrop" onClick={() => onClose(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button onClick={() => onClose(false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
