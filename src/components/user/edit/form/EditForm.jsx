import React, { useContext, useState } from "react";
import "../EditItem.scss";
import { Button, Form, Input } from "antd";
import UserService from "../../../../services/user.service";
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
export default function EditForm({ path }) {
  const { user, setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

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
    try {
      switch (path) {
        case "Email": {
          const updateValues = {
            iD_Customer: user.iD_Customer,
            name: user.name,
            contact: user.contact,
            email: values.email,
            average_feedback: user.average_feedbacks,
            packageExpirationDate: user.packageExpirationDate,
            iD_Role: user.iD_Role,
            iD_Package: user.iD_Package,
          };

          setIsLoading(true);

          try {
            const response = await UserService.editProfile(updateValues);

            if (response.success) {
              toast.success(response.message);
              setUser(updateValues);
              localStorage.setItem("user", JSON.stringify(updateValues));
            } else {
              toast.error(response.message);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }

          break;
        }

        // case "Password": {
        //   return await changePassword();
        // }

        case "Name": {
          const updateValues = {
            iD_Customer: user.iD_Customer,
            name: values.name,
            contact: user.contact,
            email: user.email,
            average_feedback: user.average_feedbacks,
            packageExpirationDate: user.packageExpirationDate,
            iD_Role: user.iD_Role,
            iD_Package: user.iD_Package,
          };

          setIsLoading(true);

          try {
            const response = await UserService.editProfile(updateValues);

            if (response.success) {
              toast.success(response.message);
              setUser(updateValues);
              localStorage.setItem("user", JSON.stringify(updateValues));
            } else {
              toast.error(response.message);
            }
          } catch (error) {
            // toast.success(response.message);
            console.log("error", error);
            return error;
          } finally {
            setIsLoading(false);
          }

          break;
        }

        case "Contact": {
          const updateValues = {
            iD_Customer: user.iD_Customer,
            name: user.name,
            contact: values.contact,
            email: user.email,
            average_feedback: user.average_feedbacks,
            packageExpirationDate: user.packageExpirationDate,
            iD_Role: user.iD_Role,
            iD_Package: user.iD_Package,
          };

          setIsLoading(true);

          try {
            const response = await UserService.editProfile(updateValues);

            if (response.success) {
              toast.success(response.message);
              setUser(updateValues);
              localStorage.setItem("user", JSON.stringify(updateValues));
            } else {
              toast.error(response.message);
            }
          } catch (error) {
            // toast.success(response.message);
            console.log("error", error);
            return error;
          } finally {
            setIsLoading(false);
          }

          break;
        }

        default:
          break;
      }
    } catch (error) {}
  };

  const EmailForm = () => {
    const initialValues = {
      email: user?.email || "",
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
            value={user.email}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="form-btn"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const PhoneForm = () => {
    const initialValues = {
      contact: user.contact || "",
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
            value={user.phone}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="form-btn"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const NameForm = () => {
    const initialValues = {
      name: user.name,
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
            value={user.name}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="form-btn"
            type="primary"
            htmlType="submit"
            loading={isLoading}
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
