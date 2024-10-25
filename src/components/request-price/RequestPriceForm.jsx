import React, { useContext, useState, useEffect } from "react";
import "./RequestPriceForm.scss";
import { Form, Input, InputNumber, Button } from "antd";
import RequestPriceService from "../../services/requestPrice.service";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Overlay from "../overlay/Overlay";

const RequestPriceForm = ({ isOpen, setIsOpen, ticketId }) => {
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    const requestData = {
      iD_Customer: user?.iD_Customer,
      price_want: values.priceWant,
      quantity: values.quantity,
      history: new Date().toISOString(),
      iD_Ticket: ticketId,
    };

    try {
      const response = await RequestPriceService.sendRequestPrice(requestData);

      if (response.success) {
        setIsOpen(false);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the request.");
      console.error("Error when submitting request:", error);
    }
  };

  return (
    <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="request-form__container">
        <h2 style={{ textAlign: "center", color: "black" }}>
          Create a request price
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{
            maxWidth: 600,
            margin: "0 auto",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          {/* <Form.Item label="Customer ID" name="customerId">
            <Input value={user?.id} disabled />
          </Form.Item> */}

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: "Please input ticket quantity!" },
            ]}
          >
            <InputNumber
              min={1}
              placeholder="Enter the quantity"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Negotiated Price"
            name="priceWant"
            rules={[
              { required: true, message: "Please input the negotiated price!" },
            ]}
          >
            <InputNumber
              min={0}
              placeholder="Enter the negotiated price"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* <Form.Item label="History (Current Date)" name="history">
            <Input value={currentTime} disabled />
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Overlay>
  );
};

export default RequestPriceForm;
