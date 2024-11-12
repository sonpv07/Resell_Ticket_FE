import React, { useEffect } from "react";
import "./PaymentBill.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import TransactionService from "../../services/transaction.service";

export default function PaymentBill() {
  const location = useLocation();

  console.log(location);

  const queryParams = new URLSearchParams(location.search);

  const code = queryParams.get("code");
  const orderCode = queryParams.get("orderCode");

  console.log(code, orderCode);

  const navigate = useNavigate();

  const checkIsSuccess = () => {
    if (location.pathname === "/success-payment") return true;

    return false;
  };

  const handleUpdate = async () => {
    const response = await TransactionService.updateTransaction(
      orderCode,
      code
    );

    console.log(response);

    if (response.success) {
      console.log(response.data);
    }
  };

  useEffect(() => {
    if (code && orderCode) {
      // Check if payment was successful with the provided code and orderCode
      handleUpdate();
    }
  }, [location]);

  return (
    <div className="successful-payment">
      <div className="successful-payment__container">
        <div className="successful-payment__header">
          <h1
            className="successful-payment__title"
            style={{ color: checkIsSuccess() ? "#4caf50" : "red" }}
          >
            Payment {checkIsSuccess() ? "Successful!" : "Failed!"}
          </h1>

          {checkIsSuccess() ? (
            <CheckOutlined
              style={{
                color: "#4caf50",
                fontSize: 50,
              }}
            />
          ) : (
            <CloseOutlined
              style={{
                color: "red",
                fontSize: 50,
              }}
            />
          )}
        </div>

        <div className="successful-payment__support">
          <p>
            If you have any questions, please contact our support team at
            support@ticketswap.com
          </p>
        </div>
      </div>
    </div>
  );
}
