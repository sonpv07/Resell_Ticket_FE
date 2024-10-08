import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Card, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
// import UserService from "../../../../services/user.service";

const { Title, Text } = Typography;

function ViewProfile() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rating: 0,
    ratingMax: 10,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // const fetchUserData = async () => {
  //   try {
  //     const response = await UserService.getProfile(3);
  //     if (response.success) {
  //       const data = await response.data;
  //       setUserInfo(data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  const handleEdit = (field) => {
    setCurrentField(field);
    form.setFieldsValue({ [field]: userInfo[field] });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setUserInfo((prev) => ({ ...prev, ...values }));
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  const maskedPassword = "•".repeat(userInfo.password.length);
  // useEffect(())
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1A2129", // Màu nền trang
      }}
    >
      <Card
        style={{
          width: 700,
          height: 600,
          backgroundColor: "#1e293b",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        cover={
          <img
            src="/avatar.jpg"
            alt="Avatar"
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              margin: "0 auto",
              objectFit: "cover",
              marginTop: "30px",
              marginBottom: "-10px",
            }}
          />
        }
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Title level={3} style={{ color: "white", textAlign: "center" }}>
            {userInfo.name}
          </Title>
          <Button type="primary" onClick={() => handleEdit("name")}>
            Rename
          </Button>

          {}
          <div
            style={{ textAlign: "left", padding: "0 40px", marginTop: "20px" }}
          >
            {}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc", // Đường phân cách ngang
              }}
            >
              <div>
                <Text style={{ color: "white" }}>Email address:</Text>
                <Text style={{ marginLeft: "20px", color: "white" }}>
                  {userInfo.email}
                </Text>
              </div>
            </div>

            {/* Phone Number */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc", // Đường phân cách ngang
              }}
            >
              <div>
                <Text style={{ color: "white" }}>Phone number:</Text>
                <Text style={{ marginLeft: "20px", color: "white" }}>
                  {userInfo.phone}
                </Text>
              </div>
              <Button
                type="link"
                style={{ color: "#1890ff" }}
                onClick={() => handleEdit("phone")}
              >
                Edit
              </Button>
            </div>

            {/* Password */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc", // Đường phân cách ngang
              }}
            >
              <div>
                <Text style={{ color: "white" }}>Password:</Text>
                <Text style={{ marginLeft: "20px", color: "white" }}>
                  {maskedPassword}
                </Text>
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  type="link"
                  style={{ color: "#1890ff", marginRight: "10px" }}
                  onClick={() => handleEdit("password")}
                >
                  Change
                </Button>
                <Button
                  type="link"
                  style={{ color: "#1890ff" }}
                  onClick={handleResetPassword}
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Rating căn sang trái và đồng đều khoảng cách */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                paddingBottom: "10px",
              }}
            >
              <div>
                <Text style={{ color: "white" }}>Average Rating:</Text>
                <Text style={{ marginLeft: "20px", color: "white" }}>
                  {userInfo.rating}/{userInfo.ratingMax}
                </Text>
              </div>
            </div>
          </div>
        </Space>
      </Card>

      <Modal
        title={`Edit ${currentField}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={currentField}
            name={currentField}
            rules={[
              { required: true, message: `Please enter your ${currentField}` },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ViewProfile;
