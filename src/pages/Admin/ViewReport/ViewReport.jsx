import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReportService from "../../../services/report.service";
import "./ViewReport.scss";
import moment from "moment";
import * as XLSX from "xlsx";

const ViewReport = () => {
  const { orderId } = useParams();
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);

  const exportToExcel = () => {
    const exportData = reportData.map((report) => ({
      ReportID: report.iD_Report,
      OrderID: report.iD_Order,
      CustomerID: report.iD_OrderNavigation?.iD_Customer,
      Comment: report.comment,
      CreationDate: moment(report.iD_OrderNavigation?.create_At).format("LLL"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, `Order_Report_${orderId}.xlsx`);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await ReportService.getReports();
        const filteredReports = response.data.filter(
          (report) => report.iD_Order === Number(orderId)
        );
        setReportData(filteredReports);
      } catch (err) {
        console.error("Error loading report data:", err);
        setError("Failed to load report data.");
      }
    };
    fetchReports();
  }, [orderId]);

  console.log(reportData);

  return (
    <div className="order-report">
      <h2>Order Report for Order ID: {orderId}</h2>

      <button onClick={exportToExcel} className="export-button">
        Export to Excel
      </button>

      {error && <p className="error">{error}</p>}

      {reportData.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Comment</th>
              <th>Create Date</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index}>
                <td>{report.iD_Report}</td>
                <td>{report.iD_Order}</td>
                <td>{report.iD_OrderNavigation?.iD_Customer}</td>
                <td>{report.comment}</td>
                <td>{moment(report.history).format("LLL")}</td>
                {/* <td>{report.iD_OrderNavigation?.payment_method}</td>
                <td>{report.iD_OrderNavigation?.totalPrice}</td>
                <td>{report.iD_OrderNavigation?.status}</td>
                <td>
                  {new Date(
                    report.iD_OrderNavigation?.create_At
                  ).toLocaleString()}
                </td> */}
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
