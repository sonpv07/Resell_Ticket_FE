import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Divider } from "antd";
import axios from "axios";
import "./Package.scss"; // Tạo file SCSS riêng cho custom styles

// Giả lập gọi API để lấy dữ liệu gói
const fetchPackages = async () => {
  return [
    {
      name: "Basic Package",
      price: 100000,
      time: 3,
      ticket: 10,
      description:
        "Quyền lợi khi đăng ký gói này bạn sẽ được xài trong vòng 3 tháng và được đăng bán 10 bài",
    },
    {
      name: "Standard Package",
      price: 200000,
      time: 6,
      ticket: 25,
      description:
        "Quyền lợi khi đăng ký gói này bạn sẽ được xài trong vòng 6 tháng và được đăng bán 25 bài",
    },
    {
      name: "Premium Package",
      price: 300000,
      time: 12,
      ticket: 50,
      description:
        "Quyền lợi khi đăng ký gói này bạn sẽ được xài trong vòng 12 tháng và được đăng bán 50 bài",
    },
  ];
};

function Package() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      const response = await fetchPackages(); // Giả lập API call
      setPackages(response);
    };
    getPackages();
  }, []);

  const getPackageStyle = (name) => {
    switch (name) {
      case "Basic Package":
        return { borderColor: "#ff4d4f", backgroundColor: "#fff1f0" };
      case "Standard Package":
        return { borderColor: "#52c41a", backgroundColor: "#f6ffed" };
      case "Premium Package":
        return { borderColor: "#1890ff", backgroundColor: "#e6f7ff" };
      default:
        return {};
    }
  };

  return (
    <div className="package-container">
      <h1 className="title">Our Package</h1>
      <Row gutter={[16, 16]} justify="center">
        {packages.map((pkg, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="package-card"
              style={{
                ...getPackageStyle(pkg.name),
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Tên gói */}
              <h3 className="package-name">{pkg.name}</h3>

              {/* Đường gạch ngang */}
              <Divider />

              {/* Giá tiền */}
              <h2 className="package-price">
                {pkg.price.toLocaleString("vi-VN")} VNĐ
              </h2>

              {/* Thông tin chi tiết */}
              <p>{pkg.description}</p>
              <p>Thời gian sử dụng: {pkg.time} tháng</p>
              <p>Đăng được: {pkg.ticket} bài viết</p>
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: "20px", marginTop: "20px" }}
              >
                Get This Plan
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Package;
