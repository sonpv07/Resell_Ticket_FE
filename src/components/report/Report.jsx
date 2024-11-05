import { CloseOutlined } from "@ant-design/icons";
import "./Report.scss";
import { Button, Divider } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import Overlay from "../overlay/Overlay";
import ReportService from "../../services/report.service";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";

export default function Report({
  isShow,
  setIsShow,
  sellerId,
  orderId,
  setOrderList,
  orderList,
  reportData,
}) {
  const [report, setReport] = useState(reportData?.comment ?? "");

  const handleSendReport = async () => {
    let body = {
      // iD_Customer: sellerId,
      iD_Order: orderId,
      comment: report,
      history: new Date().toISOString(),
    };

    const response = await ReportService.sendReport(body);

    if (response.success) {
      const orderClone = [...orderList];

      const index = orderClone.findIndex((order) => order.iD_Order === orderId);

      console.log(response);

      if (index >= 0) {
        orderClone[index].report = response.data;
        setOrderList(orderClone);
        setIsShow(false);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }

      setIsShow(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Overlay isOpen={isShow} onClose={() => setIsShow(false)}>
      <div className="report-modal">
        <div className="title-container">
          <p className="title">
            {reportData !== null ? "Your" : "Leave"} Report for Order {orderId}
          </p>
          <div className="close-btn">
            <CloseOutlined onClick={() => setIsShow(false)} />
          </div>
          <Divider className="divider" style={{ margin: 0 }} />
        </div>

        <div className="report-content">
          <TextArea
            placeholder="Write your report here..."
            rows={5}
            onChange={(e) => setReport(e.target.value)}
            disabled={reportData?.comment}
            value={report}
          />

          <button onClick={handleSendReport} disabled={reportData}>
            Submit
          </button>
        </div>
      </div>
    </Overlay>
  );
}
