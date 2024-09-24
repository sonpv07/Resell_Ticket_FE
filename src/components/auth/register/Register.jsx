import React, { useState } from "react";
import "./Register.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import AuthService from "../../../services/auth.service";

export default function Register({ toggleValue }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (values) => {
    console.log("Received values of form: ", values);

    setIsLoading(true);

    try {
      const response = await AuthService.register(values);

      console.log(response);

      // const { token } = response.data;
      // localStorage.setItem("user", JSON.stringify(response.data));
      // localStorage.setItem("token", token);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="title-container">
        <p className="title">SIGN UP</p>
        <div className="close-btn">
          <CloseOutlined onClick={() => toggleValue(false)} />
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                ]}
              >
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="form-input"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name",
                  },
                ]}
              >
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="form-input"
                />
              </Form.Item>
            </div>

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
              <p>Already have account?</p>
              <p className="link">Login now</p>
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
  );
}
