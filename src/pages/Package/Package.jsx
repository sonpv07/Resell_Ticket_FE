import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Divider } from "antd";
import PackageService from "../../services/package.service"; 
import "./Package.scss";  

function Package() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await PackageService.getPackageList();  // Gọi API lấy danh sách package
      if (response.success) {
        setPackages(response.data);  
      } else {
        console.error(response.message);
      }
      setLoading(false);  // Tắt trạng thái loading
    };

    fetchPackages();  // Gọi hàm khi component mount
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
      <h1 className="title">Our Packages</h1>
      {loading ? (
        <div>Loading...</div>  // Hiển thị loading khi dữ liệu đang được tải
      ) : (
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
                <h3 className="package-name">{pkg.name}</h3>

                <Divider />

                <h2 className="package-price">
                  {pkg.price.toLocaleString("vi-VN")} VNĐ
                </h2>

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
      )}
    </div>
  );
}

export default Package;
