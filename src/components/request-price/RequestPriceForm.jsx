import React, { useContext, useState, useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RequestPriceService from "../../services/requestPrice.service";
import { AuthContext } from "../../context/AuthContext"; 

const RequestPriceForm = () => {
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext); // Lấy user info từ context
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Lấy thời gian hiện tại
    const now = new Date();
    setCurrentTime(now.toISOString());
  }, []);

  const handleSubmit = async (values) => {
    const requestData = {
      iD_Customer: user?.id,  // Lấy ID cus từ context
      price_want: values.priceWant || null,  
      history: currentTime,  // Sử dụng thời gian hiện tại
    };

    try {
      const response = await RequestPriceService.sendRequestPrice(requestData);

      if (response.success) {
        toast.success("Request submitted successfully!");
      } else {
        toast.error("Failed to submit request: " + response.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the request.");
      console.error("Error when submitting request:", error);
    }
  };

  return (
    <div>
      <ToastContainer /> 
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 600, margin: "0 auto", padding: "20px", marginTop: "80px", background: "#f0f2f5", borderRadius: "10px" }}
      >
        <Form.Item
          label="Customer ID"
          name="customerId"
        >
          <Input value={user?.id} disabled /> 
        </Form.Item>

        <Form.Item
          label="Negotiated Price"
          name="priceWant"
          rules={[{ required: true, message: "Please input the negotiated price!" }]}
        >
          <InputNumber
            min={0}
            placeholder="Enter the negotiated price"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="History (Current Date)"
          name="history"
        >
          <Input value={currentTime} disabled />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Request
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RequestPriceForm;
