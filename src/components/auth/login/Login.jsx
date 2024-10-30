import React, { useContext, useState } from "react";
import "./Login.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import AuthService from "../../../services/auth.service";
import { AuthContext } from "../../../context/AuthContext";
import UserService from "../../../services/user.service";
import { toast } from "react-toastify";
import Overlay from "../../overlay/Overlay";
import { useNavigate } from "react-router-dom"; // Thêm hook useNavigate

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser, setAccessToken, showForm, setShowForm } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log("Received values of form: ", values);

    setIsLoading(true);

    try {
      const response = await AuthService.login(values);

      if (response.success) {
        setAccessToken(response.data.accessToken);
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.accessToken)
        );

        console.log(response.data);

        const user = await UserService.getProfile(response.data.id);

        if (user) {
          setUser(user.data);
          localStorage.setItem("user", JSON.stringify(user.data));
          toast.success(response.message);

          // Kiểm tra vai trò người dùng
          if (user.data.iD_RoleNavigation?.name_role === "Admin") {
            navigate("/admin-dashboard");
          }
        }
      } else {
        toast.error(response.message);
        setErrorMessage(response.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setShowForm("");
    }
  };

  const handleLoginGoogle = () => {
    window.open("http://14.225.204.144:7070/api/Auth/login-google", "_self");
  };

  return (
    <Overlay isOpen={showForm === "LOGIN"} onClose={() => setShowForm("")}>
      <div className="login-container">
        <div className="title-container">
          <p className="title">LOGIN</p>
          <div className="close-btn">
            <CloseOutlined onClick={() => setShowForm("")} />
          </div>
          <Divider className="divider" style={{ margin: 0 }} />
        </div>

        <div className="body-container">
          <div className="mail-btn" onClick={handleLoginGoogle}>
            <img alt="google-icon" src="google.png" className="mail-img" />
            <p>Continue with Google</p>
          </div>

          <Divider className="divider" style={{ margin: 0 }}>
            or
          </Divider>

          <div className="form-container">
            <Form
              className="form"
              labelCol={{ span: 24 }}
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                ]}
              >
                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please Input Password",
                  },
                ]}
              >
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                />
              </Form.Item>

              <div className="login-link">
                <p>Don't have account?</p>
                <p className="link" onClick={() => setShowForm("REGISTER")}>
                  Register now
                </p>
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <Form.Item>
                <Button
                  className="form-btn"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
