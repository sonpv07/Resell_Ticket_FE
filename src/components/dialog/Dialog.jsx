import React from "react";
import "./Dialog.scss";
import Overlay from "../overlay/Overlay";

const Dialog = ({
  isOpen,
  onClose,
  onAction,
  component,
  title,
  actionText,
  closeText = "Close",
}) => {
  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="action-modal">
        <h2 className="action-modal__title">{title}</h2>
        <hr style={{ width: "100%" }} />
        <div className="action-modal__content">{component}</div>

        <hr style={{ width: "100%" }} />

        <div className="action-modal__actions">
          <button
            className="action-modal__button action-modal__button--secondary"
            onClick={onClose}
          >
            {closeText}
          </button>
          <button
            className="action-modal__button action-modal__button--primary"
            onClick={onAction}
          >
            {actionText}
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default Dialog;
