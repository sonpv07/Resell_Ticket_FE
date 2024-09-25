import React from "react";
import "../EditItem.scss";
import { Button, Form, Input } from "antd";
export default function EditForm({ path, userData }) {
  console.log(userData);

  const getLabel = () => {
    switch (path) {
      case "Email":
        return "Edit your email address";

      case "Password":
        return "Change your account password";

      case "Name":
        return "Edit your account name";

      default:
        break;
    }
  };

  const getFormType = () => {
    switch (path) {
      case "Email":
        return <EmailForm />;

      case "Password":
        return <PasswordForm />;

      case "Name":
        return <NameForm />;

      default:
        break;
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);

    // try {
    //   switch (path) {
    //     case "Email": {
    //       return await editEmail();F
    //     }

    //     case "Password": {
    //       return await changePassword();
    //     }

    //     case "Name": {
    //       return await changeName();
    //     }

    //     default:
    //       break;
    //   }
    // } catch (error) {}
  };

  const EmailForm = () => {
    const initialValues = {
      email: userData.email,
    };
    return (
      <Form
        className="form"
        labelCol={{ span: 24 }}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item name="email">
          <Input
            type="text"
            name="email"
            placeholder="Email"
            className="form-input"
            value={userData.email}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="form-btn"
            type="primary"
            htmlType="submit"
            // loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const NameForm = () => {
    const initialValues = {
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    return (
      <Form
        className="form"
        labelCol={{ span: 24 }}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item name="firstName">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="form-input"
            value={userData.firstName}
          />
        </Form.Item>
        <Form.Item name="lastName">
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="form-input"
            value={userData.lastName}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="form-btn"
            type="primary"
            htmlType="submit"
            // loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const PasswordForm = () => {
    return (
      <Form className="form" labelCol={{ span: 24 }} onFinish={handleSubmit}>
        <Form.Item name="password">
          <Input
            type="password"
            name="oldPassword"
            placeholder="Enter your current password"
            className="form-input"
          />
        </Form.Item>
        <Form.Item name="newPassword">
          <Input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            className="form-input"
          />
        </Form.Item>

        <Form.Item name="reNewPassword">
          <Input
            type="password"
            name="reNewPassword"
            placeholder="Enter new password again"
            className="form-input"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="form-btn"
            type="primary"
            htmlType="submit"
            // loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="edit-form-container">
      <p className="label">{getLabel()}</p>
      <div>{getFormType()}</div>
    </div>
  );
}
