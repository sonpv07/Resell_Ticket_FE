import React from "react";
import "./ConfirmSuccess.scss";

const ConfirmSuccess = () => {
  return (
    <div className="email-confirmation">
      <div className="email-confirmation__container">
        <div className="email-confirmation__icon">
          <div className="email-confirmation__checkmark">✓</div>
        </div>

        <h1 className="email-confirmation__title">Email Confirmed!</h1>

        <div className="email-confirmation__message">
          <p>Your email address has been successfully verified.</p>
          <p>You can now access all features of your account.</p>
        </div>

        <div className="email-confirmation__next-steps">
          <h2>What's Next?</h2>
          <ul>
            <li>Browse available tickets</li>
            <li>Set up your profile</li>
            <li>Start selling tickets</li>
          </ul>
        </div>

        {/* <div className="email-confirmation__actions">
          <button className="email-confirmation__button email-confirmation__button--primary">
            Login Now
          </button>
          <button className="email-confirmation__button email-confirmation__button--secondary">
            Browse Tickets
          </button>
        </div> */}

        <div className="email-confirmation__support">
          <p>Need help? Contact our support team at support@ticketswap.com</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSuccess;
