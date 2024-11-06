import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReportService from "../../../services/report.service";
import "./ViewReport.scss";

const ViewReport = () => {
  const { orderId } = useParams(); 
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await ReportService.getReports();
        const filteredReports = response.data.filter((report) => report.iD_Order === Number(orderId));
        setReportData(filteredReports);
      } catch (err) {
        console.error("Error loading report data:", err);
        setError("Failed to load report data.");
      }
    };
    fetchReports();
  }, [orderId]);

  return (
    <div className="order-report">
      <h2>Order Report for Order ID: {orderId}</h2>

      {error && <p className="error">{error}</p>}

      {reportData.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Comment</th>
              <th>History</th>
              <th>Payment Method</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Shipping Time</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index}>
                <td>{report.iD_Report}</td>
                <td>{report.iD_Order}</td>
                <td>{report.iD_OrderNavigation?.iD_Customer}</td>
                <td>{report.comment}</td>
                <td>{new Date(report.history).toLocaleString()}</td>
                <td>{report.iD_OrderNavigation?.payment_method}</td>
                <td>{report.iD_OrderNavigation?.totalPrice}</td>
                <td>{report.iD_OrderNavigation?.status}</td>
                <td>{new Date(report.iD_OrderNavigation?.shipping_time).toLocaleString()}</td>
                <td>{new Date(report.iD_OrderNavigation?.create_At).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No report data available for this order.</p>
      )}
    </div>
  );
};

export default ViewReport;
