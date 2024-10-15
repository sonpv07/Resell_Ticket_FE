import React, { useState, useEffect } from "react";
import { Card, Typography, Space, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";

const { Title, Text } = Typography;

function ViewProfile() {
  const [userInfo, setUserInfo] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // Fetch user data 
  const fetchUserData = async () => {
    try {
      const response = await UserService.getProfile(1); // ID người dùng (1) cần được thay thế theo logic của bạn

      if (response.success) {
        setUserInfo(response.data);  // Set user data from API response
      } else {
        console.error("Error fetching user data");
      }

      setLoading(false);  
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchUserData(); 
  }, []);

  const handleEditProfile = () => {
    navigate("/edit");
  };

  // Show spinner while loading data
  if (loading) {
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
        <Spin size="large" />
      </div>
    );
  }

  const maskedPassword = "•".repeat(userInfo.password.length);

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
        cover={
          <img
            src={userInfo.avatar || "./avatar.jpg"}  // Sử dụng avatar từ API hoặc ảnh mặc định
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
                borderBottom: "1px solid #ccc",
              }}
            >
              <div>
                <Text style={{ color: "white" }}>Phone number:</Text>
                <Text style={{ marginLeft: "20px", color: "white" }}>
                  {userInfo.phone}
                </Text>
              </div>
            </div>

            {/* Password */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc", // Horizontal separator
              }}
            >
              <div>
                <Text style={{ color: "white" }}>Password:</Text>
                <Text style={{ marginLeft: "20px", color: "white" }}>
                  {maskedPassword}
                </Text>
              </div>
            </div>

            {/* Rating */}
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
                  {userInfo.rating}/5
                </Text>
              </div>
            </div>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default ViewProfile;
