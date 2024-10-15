import { CloseOutlined } from "@ant-design/icons";
import "./Report.scss";
import { Button, Divider } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import Overlay from "../overlay/Overlay";
import ReportService from "../../services/report.service";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";

export default function Report({ isShow, setIsShow, sellerId, orderId }) {
  const [report, setReport] = useState("");

  const handleSendReport = async () => {
    let body = {};

    const response = await ReportService.sendReport(body);

    if (response.success) {
      toast.success(response.message);
      setIsShow(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Overlay isOpen={isShow} onClose={() => setIsShow(false)}>
      <div className="report-modal">
        <div className="title-container">
          <p className="title">REPORT</p>
          <div className="close-btn">
            <CloseOutlined onClick={() => setIsShow(false)} />
          </div>
          <Divider className="divider" style={{ margin: 0 }} />
        </div>

        <div className="report-content">
          <TextArea
            placeholder="Write your report here..."
            rows={5}
            onChange={(value) => setReport(value)}
          />

          <button onClick={handleSendReport}>Submit</button>
        </div>
      </div>
    </Overlay>
  );
}
