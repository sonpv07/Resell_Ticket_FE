import React, { useState, useContext } from "react";
import { Card, Typography, Space, Button, Spin, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function ViewProfile() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleEditProfile = () => {
    navigate("edit");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1A2129",
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

        // cover={
        //   <img
        //     src={user?.avatar || "./avatar.jpg"} // Sử dụng avatar từ API hoặc ảnh mặc định
        //     alt="Avatar"
        //     style={{
        //       width: 150,
        //       height: 150,
        //       borderRadius: "50%",
        //       margin: "0 auto",
        //       objectFit: "cover",
        //       marginTop: "30px",
        //       marginBottom: "-10px",
        //     }}
        //   />

        // }
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Avatar
            size={120}
            icon={!user?.avatar && <UserOutlined />}
            src={user?.avatar}
            style={{ margin: "0 auto" }}
          />

          <Title level={3} style={{ color: "white", textAlign: "center" }}>
            {user.name}
          </Title>
          <Button type="primary" onClick={handleEditProfile}>
            Edit Profile
          </Button>

          <div
            style={{ textAlign: "left", padding: "0 40px", marginTop: "20px" }}
          >
            {/* Email */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc", // Horizontal separator
              }}
            >
              <div>
                <Text style={{ color: "white" }}>Email address:</Text>
                <Text style={{ marginLeft: "20px", color: "white" }}>
                  {user.email}
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
                borderBottom: "1px solid #ccc",
              }}
            >
              <div>
                <Text style={{ color: "white" }}>Phone number:</Text>
                <Text style={{ marginLeft: "20px", color: "white" }}>
                  {user.contact}
                </Text>
              </div>
            </div>

            {/* Password */}
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc", // Horizontal separator
              }}
            ></div> */}

            {/* Rating */}
            {/* <div
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
                  {user.average_feedback}/5
                </Text>
              </div>
            </div> */}

            <Button type="primary" onClick={() => navigate("/package")}>
              Upgrade Package
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default ViewProfile;
