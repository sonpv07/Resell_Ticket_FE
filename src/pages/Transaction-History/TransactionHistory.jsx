import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./TransactionHistory.scss";
import Feedback from "../Feedback/Feedback";
import OrderService from "../../services/order.service";
import { AuthContext } from "../../context/AuthContext";
import { currencyFormatter } from "../../utils";
import FeedbackService from "../../services/feedack.service";
import Report from "../../components/report/Report";
import ReportService from "../../services/report.service";
import TransactionService from "../../services/transaction.service";
import PackageService from "../../services/package.service";

const TransactionHistory = () => {
  const [transaction, setTransaction] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchTransaction = async () => {
    const response = await TransactionService.getTransactionByUser(
      user.iD_Customer
    );

    const packageResponse = await PackageService.getPackageList();

    if (response?.success && packageResponse.success) {
      const transactionList = response.data.map((item) => ({
        ...item,
        package: packageResponse.data.find(
          (pkg) => pkg.iD_Package === item.iD_Package
        ),
      }));

      console.log(transactionList);

      setTransaction(transactionList);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  console.log(transaction);

  return (
    <div className="order-history-container">
      <h1>Your Orders</h1>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Package</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transaction.length > 0 ? (
            transaction.map((trs, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{trs?.package?.name_Package}</td>
                <td>{currencyFormatter(trs?.package?.price)}</td>
                <td>{trs?.status}</td>
                <td>{moment(trs?.created_At).format("LLL")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
