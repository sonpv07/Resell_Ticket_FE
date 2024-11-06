import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import UserService from "../../../services/user.service"; 
import './TransactionPage.scss'; 

const TransactionPage = () => {
  const { customerId } = useParams(); 
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await UserService.getTransactionByCustomerId(customerId);
        if (response && Array.isArray(response)) {
          setTransactions(response);
        }  else {
              setError("Error fetching transactions: " + (error.message || "Unknown error occurred"));
        }
    
} catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [customerId]);

  if (loading) return <div className="loading">Loading transactions...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="transaction-page">
      <h2 className="admin-title">Transaction Details for Customer ID: {customerId}</h2>
      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Final Price</th>
              <th>Transaction Code</th>
              <th>Transaction Type</th>
              <th>Package ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionCode}>
                <td>{transaction.iD_Payment}</td>
                <td>{new Date(transaction.created_At).toLocaleString()}</td>
                <td>{transaction.status}</td>
                <td>{transaction.finalPrice}</td>
                <td>{transaction.transactionCode}</td>
                <td>{transaction.transaction_Type}</td>
                <td>{transaction.iD_Package}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-transactions">No transactions available for this customer.</div>
      )}
    </div>
  );
};

export default TransactionPage;
