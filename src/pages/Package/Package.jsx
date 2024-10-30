import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col, Divider } from "antd";
import "./Package.scss";
import { currencyFormatter } from "../../utils";
import PackageService from "../../services/package.service";
import TransactionService from "../../services/transaction.service";
import { AuthContext } from "../../context/AuthContext";

// Giả lập gọi API để lấy dữ liệu gói

function Package() {
  const [packages, setPackages] = useState([]);

  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    const response = await PackageService.getPackageList();

    if (response.success) {
      setPackages(response.data);
    }
  };

  const handleBuyPackage = async (pkg) => {
    setLoading(true);

    let body = {
      iD_Customer: user.iD_Customer,
      iD_Package: pkg.iD_Package,
      finalPrice: pkg.price,
      iD_Payment: 1,
      transaction_Type: "Package",
    };

    console.log(body);

    const response = await TransactionService.createPayment(body);

    if (response.success) {
      window.open(response.data.url);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPackageStyle = (index) => {
    switch (index) {
      case 1:
        return { borderColor: "#ff4d4f", backgroundColor: "#fff1f0" };
      case 2:
        return { borderColor: "#52c41a", backgroundColor: "#f6ffed" };
      case 3:
        return { borderColor: "#1890ff", backgroundColor: "#e6f7ff" };
      default:
        return {};
    }
  };

  return (
    <div className="package-container">
      <h1 className="title">Our Package</h1>
      <Row gutter={[16, 16]} justify="space-between">
        {packages.map((pkg, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="package-card"
              style={{
                ...getPackageStyle(index + 1),
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Tên gói */}
              <h3 className="package-name">
                {pkg.name_Package}{" "}
                {pkg.iD_Package === user?.iD_Package &&
                  "( Your current package )"}
              </h3>

              {/* Đường gạch ngang */}
              <hr />

              {/* Giá tiền */}
              <h2 className="package-price">{currencyFormatter(pkg.price)}</h2>

              {/* Thông tin chi tiết */}
              <p className="package-des">{pkg.description}</p>
              <p>
                <span>Package Time: </span> {pkg.time_package} days
              </p>
              <p>
                <span>Selling Limit:</span> {pkg.ticket_can_post} times
              </p>

              {/* {pkg.iD_Package === user?.iD_Package ? (
                <Button
                  type="primary"
                  size="large"
                  style={{ borderRadius: "20px", marginTop: "20px" }}
                >
                  Your current package
                </Button>
              ) : ( */}
              <Button
                type="primary"
                size="large"
                style={{ borderRadius: "20px", marginTop: "20px" }}
                onClick={() => handleBuyPackage(pkg)}
                disabled={loading}
                loading={loading && pkg.iD_Package === user?.iD_Package}
              >
                Get This Plan
              </Button>
              {/* )} */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Package;
