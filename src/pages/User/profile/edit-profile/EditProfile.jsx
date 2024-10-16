import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Card, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../../context/AuthContext";
import UserService from "../../../../services/user.service";

const { Title } = Typography;

function EditProfile() {
  const { user } = useContext(AuthContext);

  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
    phone: user?.contact,
    password: user?.password,
  });
  const [editPassword, setEditPassword] = useState(false); // State for toggling password edit fields
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://66f646f8436827ced976737d.mockapi.io/profile/1"
  //     );
  //     setUserInfo(response.data);
  //     form.setFieldsValue(response.data);
  //   } catch (error) {
  //     toast.error("Error fetching user data");
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  const handleSave = async (values) => {
    if (editPassword) {
      if (oldPassword !== userInfo.password) {
        toast.error("Old password is incorrect");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        toast.error("New passwords do not match");
        return;
      }
      values.password = newPassword;
    }

    let body = {
      ID_Customer: user.iD_Customer,
      Name: values.name,
      Contact: values.phone,
      Password: values.password ?? null,
      Avatar: null,
    };

    console.log(body);

    const response = await UserService.editProfile(body);

    console.log(response);

    if (response.success) {
      toast.success("Profile updated successfully!");
    }

    // try {
    //   await axios.put(
    //     "https://66f646f8436827ced976737d.mockapi.io/profile/1",
    //     values
    //   );
    //   toast.success("Profile updated successfully!");
    //   navigate("/view-profile");
    // } catch (error) {
    //   console.error("Error updating profile:", error);
    //   toast.error("Failed to update profile");
    // }
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
          backgroundColor: "#24303B",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ color: "white" }}>
          Edit Profile
        </Title>

        <Form
          form={form}
          layout="vertical"
          initialValues={userInfo}
          onFinish={handleSave}
        >
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              style={{
                backgroundColor: "#324A5F",
                color: "#F0F0F0",
                fontWeight: "bold",
                border: "1px solid #666",
              }}
            />
          </Form.Item>

          {/* Email (Disabled) */}
          <Form.Item label="Email" name="email">
            <Input
              disabled
              style={{
                backgroundColor: "#24303B",
                color: "#888",
                border: "1px solid #666",
                fontStyle: "italic",
              }}
            />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              style={{
                backgroundColor: "#324A5F",
                color: "#F0F0F0",
                fontWeight: "bold",
                border: "1px solid #666",
              }}
            />
          </Form.Item>

          {/* Old Password */}
          {editPassword && (
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your old password!" },
              ]}
            >
              <Input.Password
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{
                  backgroundColor: "#324A5F",
                  color: "#F0F0F0",
                  border: "1px solid #666",
                }}
              />
            </Form.Item>
          )}

          {/* New Password */}
          {editPassword && (
            <>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    backgroundColor: "#324A5F",
                    color: "#F0F0F0",
                    border: "1px solid #666",
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="confirmNewPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                ]}
              >
                <Input.Password
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  style={{
                    backgroundColor: "#324A5F",
                    color: "#F0F0F0",
                    border: "1px solid #666",
                  }}
                />
              </Form.Item>
            </>
          )}

          {/* Toggle sửa mật khẩu */}
          <Button
            type="link"
            onClick={() => setEditPassword(!editPassword)}
            style={{ marginBottom: "20px", color: "lightblue" }}
          >
            {editPassword ? "Cancel Password Change" : "Change Password"}
          </Button>

          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => navigate("/view-profile")}>Cancel</Button>
          </Space>
        </Form>
      </Card>

      <ToastContainer />
    </div>
  );
}

export default EditProfile;
