import React from "react";
import "./UserDetailModal.scss";
import Overlay from "../overlay/Overlay";

export default function UserDetailModal({ isOpen, setIsOpen, user }) {
  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="user-details-modal">
        <div className="user-details-modal__content">
          <div className="user-details-modal__avatar">
            <img src={user.avatar} alt={`${user.name}'s avatar`} />
          </div>
          <h2 className="user-details-modal__name">{user.name}</h2>
          <div className="user-details-modal__info">
            <div className="user-details-modal__info-item">
              <span className="user-details-modal__info-label">Email:</span>
              <span className="user-details-modal__info-value">
                {user.email}
              </span>
            </div>
            <div className="user-details-modal__info-item">
              <span className="user-details-modal__info-label">Phone:</span>
              <span className="user-details-modal__info-value">
                {user.contact}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
