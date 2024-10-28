import React, { useEffect, useState } from "react";
import "./EditTicket.scss";
import { Button, Form, InputNumber, Radio } from "antd";
import Overlay from "../../../components/overlay/Overlay";
import TicketService from "../../../services/ticket.service";
import { toast } from "react-toastify";

export default function EditTicket({
  isOpen,
  setIsOpen,
  ticket,
  ticketList,
  setTicketList,
}) {
  const [form] = Form.useForm();
  const [isChanged, setIsChanged] = useState(false);

  const handleSubmit = async (values) => {
    const body = {
      iD_Ticket: ticket.key,
      price: values.price,
      quantity: values.quantity,
      status: values.status,
    };

    const response = await TicketService.editTicket(body);

    if (response.success) {
      const cloneTicket = [...ticketList];
      const index = cloneTicket.findIndex((item) => item.key === ticket.key);

      if (index >= 0) {
        cloneTicket[index] = { ...cloneTicket[index], ...body };
        setTicketList(cloneTicket);
        toast.success(response.message);
      }
    } else {
      toast.error(response.message);
    }
  };

  const handleValuesChange = (_, allValues) => {
    const isFormChanged = Object.keys(allValues).some(
      (key) => allValues[key] !== ticket[key]
    );
    setIsChanged(isFormChanged);
  };

  useEffect(() => {
    form.setFieldsValue({
      price: ticket?.price,
      quantity: ticket?.quantity,
      status: ticket?.status,
    });
    setIsChanged(false); // Reset isChanged when ticket data is updated
  }, [ticket, form]);

  return (
    <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="request-form__container">
        <h2 style={{ textAlign: "center", color: "black" }}>
          Create a request price
        </h2>

        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          onFinish={handleSubmit}
          style={{
            maxWidth: 600,
            margin: "0 auto",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input ticket price!" }]}
          >
            <InputNumber
              min={1}
              placeholder="Enter the price"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input the quantity" }]}
          >
            <InputNumber
              min={0}
              placeholder="Enter the quantity"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select availability!" }]}
          >
            <Radio.Group>
              <Radio value="Available">Available</Radio>
              <Radio value="Unavailable">Unavailable</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!isChanged}>
              Submit Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Overlay>
  );
}
