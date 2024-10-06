import React, { useContext } from "react";
import "./Header.scss";
import { AuthContext } from "../../context/AuthContext";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import {
  BellFilled,
  LogoutOutlined,
  NotificationFilled,
  SettingFilled,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { SETTING_DATA } from "../../configs/constant";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleOnClick = (label) => {
    switch (label) {
      case "Profile":
        navigate("/view-profile");
        break;
      case "Notifications":
        navigate("/view-profile");
        break;
      case "Ticket alerts":
        navigate("/view-profile");
        break;
      case "Logout":
        navigate("/view-profile");
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

  const { showForm, setShowForm, user } = useContext(AuthContext);

  return (
    <>
      <header className="header">
        <div className="header__logo">TicketSwap</div>
        <div className="header__nav">
          <p onClick={() => navigate("/tickets")}>Shopping</p>
          <Badge count={1} size="small">
            <ShoppingCartOutlined style={{ fontSize: 28, color: "white" }} />
          </Badge>

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

          <button
            className="header__button"
            // onClick={() => navigation(`/ticket/${id}`)}
          >
            Sell Ticket
          </button>
        </div>
      </header>
      {showForm === "LOGIN" && <Login />}
      {showForm === "REGISTER" && <Register />}
    </>
  );
};

export default Header;
