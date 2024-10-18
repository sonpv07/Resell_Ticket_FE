import React from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";

const { Option } = Select;

const RequestPriceForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Received values of form: ", values);
    // Xử lý logic gửi yêu cầu giá ở đây, có thể gọi API
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 600, margin: "0 auto", padding: "20px", background: "#f0f2f5", borderRadius: "10px" }}
    >
      <Form.Item
        label="Tên vé (Show Name)"
        name="showName"
        rules={[{ required: true, message: "Vui lòng nhập tên vé!" }]}
      >
        <Input placeholder="Nhập tên sự kiện hoặc buổi diễn" />
      </Form.Item>

      <Form.Item
        label="Ngày sự kiện (Event Date)"
        name="eventDate"
        rules={[{ required: true, message: "Vui lòng chọn ngày sự kiện!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Số lượng vé (Quantity)"
        name="quantity"
        rules={[{ required: true, message: "Vui lòng nhập số lượng vé!" }]}
      >
        <InputNumber min={1} placeholder="Nhập số lượng vé muốn mua" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Vị trí ghế (Seat)"
        name="seat"
      >
        <Input placeholder="Nhập vị trí ghế (nếu có)" />
      </Form.Item>

      <Form.Item
        label="Người bán (Seller)"
        name="sellerId"
        rules={[{ required: true, message: "Vui lòng chọn người bán!" }]}
      >
        <Select placeholder="Chọn người bán">
          {/* Thay thế các Option này bằng dữ liệu người bán từ backend */}
          <Option value="1">Người bán 1</Option>
          <Option value="2">Người bán 2</Option>
          <Option value="3">Người bán 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Giá thương lượng (Negotiated Price)"
        name="negotiatedPrice"
        rules={[{ required: true, message: "Vui lòng nhập giá thương lượng!" }]}
      >
        <InputNumber
          min={0}
          placeholder="Nhập giá bạn muốn thương lượng"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Gửi yêu cầu giá
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RequestPriceForm;