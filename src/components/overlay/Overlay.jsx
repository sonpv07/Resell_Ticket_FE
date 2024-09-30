import React from "react";
import "./Overlay.scss";
export default function Overlay({ onClose, isOpen, children }) {
  console.log(children);

  return (
    <>
      {isOpen ? (
        <div className="overlay">
          <div className="overlay__background" onClick={onClose}></div>
          <div className="overlay__container">{children}</div>
        </div>
      ) : null}
    </>
  );
}
