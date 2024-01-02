import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className, onClose }) {
  const dialog = useRef();
  const cssClasses = `modal ${className || ""}`;

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={cssClasses} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
