import React from "react";
import "../EditItem.scss";
import { Button, Form, Input } from "antd";
import UserService from "../../../../services/user.service";
export default function EditForm({ path, userData }) {
  console.log(userData);

  const getLabel = () => {
    switch (path) {
      case "Email":
        return "Edit your email address";

      case "Password":
        return "Change your account password";

      case "Contact":
        return "Change your contact number";

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

      case "Contact":
        return <PhoneForm />;

      default:
        break;
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      switch (path) {
        // case "Email": {
        //   return await editEmail();F
        // }

        // case "Password": {
        //   return await changePassword();
        // }

        case "Name": {
          const updateValues = {
            iD_Customer: 1,
            name: values.name,
            contact: "4984720617196565917702320421074306958",
            email:
              "uIYLP.Hr6H2aCTUboB1jKZKzR6hRAH_.rlJZ1OtTSu7Rq-ROo@gmail.com",
            average_feedback: 0,
            packageExpirationDate: "2024-09-30T01:52:03.569Z",
            iD_Role: 1,
            iD_Package: 1,
          };

          return await UserService.editProfile(updateValues);
        }

        default:
          break;
      }
    } catch (error) {}
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

  const PhoneForm = () => {
    const initialValues = {
      contact: userData.phone,
    };
    return (
      <Form
        className="form"
        labelCol={{ span: 24 }}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item name="contact">
          <Input
            type="text"
            name="contact"
            placeholder="Contact"
            className="form-input"
            value={userData.phone}
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
      name: userData.name,
    };

    return (
      <Form
        className="form"
        labelCol={{ span: 24 }}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item name="name">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            className="form-input"
            value={userData.name}
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
