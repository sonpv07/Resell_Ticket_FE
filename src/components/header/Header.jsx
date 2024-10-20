import React, { useContext } from "react";
import "./Header.scss";
import { AuthContext } from "../../context/AuthContext";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { SETTING_DATA } from "../../configs/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DialogContext } from "../../context/DialogContext";

const Header = () => {
  const { showForm, setShowForm, user, setUser } = useContext(AuthContext);
  const { openDialog, closeDialog } = useContext(DialogContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logout Success");
  };

  const handleOpenDialog = () => {
    openDialog({
      title: "Alert",
      component: <p>You must register a package to sell ticket</p>,
      okCallback: () => {
        navigate("/package");
        closeDialog();
      },

      okText: "Confirm",
      cancelText: "Cancel",
    });
  };

  const handleOnClick = (label) => {
    switch (label) {
      case "Profile":
        navigate("/profile");
        break;
      case "Notifications":
        navigate("/view-profile");
        break;
      case "Ticket alerts":
        navigate("/view-profile");
        break;
      case "Order History":
        navigate("/order-history");
        break;
      case "Seller Space":
        navigate("/seller");
        break;
      case "Logout":
        handleLogout();
        break;

      default:
        break;
    }
  };

  const menu = (
    <Menu
      style={{
        background: "#1a2121",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginTop: "18px",
        marginLeft: "-20px",
      }}
    >
      {SETTING_DATA.map((item) => {
        return (
          <Menu.Item
            onClick={() => handleOnClick(item.label)}
            key="item.label"
            style={{
              width: "200px",
            }}
          >
            <div className="menu-item">
              {item.icon}
              <p>{item.label}</p>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const checkIsSeller = () => {
    if (user?.iD_Package) return true;
    return false;
  };

  return (
    <>
      <header className="header">
        <div className="header__logo" onClick={() => navigate("/")}>
          TicketSwap
        </div>
        <div className="header__nav">
          <p onClick={() => navigate("/tickets")}>Shopping</p>

          {/* {user && (
            <div onClick={() => navigate("/cart")}>
              <Badge count={1} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: 28, color: "white", cursor: "pointer" }}
                />
              </Badge>
            </div>
          )} */}

          {user ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <Badge size="small" count={1}>
                <Avatar
                  style={{ cursor: "pointer", background: "#ccc" }}
                  size={45}
                  icon={<UserOutlined />}
                />
              </Badge>
            </Dropdown>
          ) : (
            <p onClick={() => setShowForm("LOGIN")}>Login</p>
          )}
        </div>
      </header>
      {showForm === "LOGIN" && <Login />}
      {showForm === "REGISTER" && <Register />}
    </>
  );
};

export default Header;
