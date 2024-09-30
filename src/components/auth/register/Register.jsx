import React, { useContext, useState } from "react";
import "./Register.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import AuthService from "../../../services/auth.service";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import Overlay from "../../overlay/Overlay";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const { showForm, setShowForm } = useContext(AuthContext);

  const handleRegister = async (values) => {
    console.log("Received values of form: ", values);

    setIsLoading(true);

    try {
      const response = await AuthService.register(values);

      if (response.success) {
        toast.success(response.message);
        setShowForm("");
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Overlay isOpen={showForm === "REGISTER"} onClose={() => setShowForm("")}>
      <div className="login-container">
        <div className="title-container">
          <p className="title">SIGN UP</p>
          <div className="close-btn">
            <CloseOutlined onClick={() => setShowForm("")} />
          </div>
          <Divider className="divider" style={{ margin: 0 }} />
        </div>

        <div className="body-container">
          <div className="mail-btn">
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
              onFinish={handleRegister}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name",
                  },
                ]}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-input"
                />
              </Form.Item>

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

              <Form.Item
                name="confirmPassWord"
                rules={[
                  {
                    required: true,
                    message: "Please Input Password",
                  },
                ]}
              >
                <Input
                  type="password"
                  name="confirmPassWord"
                  placeholder="Input Password Again"
                  className="form-input"
                />
              </Form.Item>

              <div className="login-link">
                <p>Already have account?</p>
                <p className="link" onClick={() => setShowForm("LOGIN")}>
                  Login now
                </p>
              </div>

              <Form.Item>
                <Button
                  className="form-btn login"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
