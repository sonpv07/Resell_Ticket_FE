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
  const { showForm, setShowForm, user, setUser, notification } =
    useContext(AuthContext);

  console.log(notification);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout Success");
  };

  const handleOnClick = (label) => {
    switch (label) {
      case "Profile":
        navigate("/profile");
        break;
      case "Notifications":
        navigate("/notification");
        break;
      case "Ticket alerts":
        navigate("/view-profile");
        break;
      case "Order History":
        navigate("/order-history");
        break;
      case "Request List":
        navigate("request");
        break;
      case "Seller Space":
        navigate("/seller");
        break;
      case "Transaction History":
        navigate("/transactions-history");
        break;
      case "Chat":
        navigate("/chat");
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
      {SETTING_DATA.map((item) =>
        (item.needPackage && user?.iD_Package !== null) || !item.needPackage ? (
          <Menu.Item
            onClick={() => handleOnClick(item.label)}
            key={item.label}
            style={{
              width: "230px",
            }}
          >
            <div className="menu-item">
              {item.icon}
              <p>{item.label}</p>
            </div>
          </Menu.Item>
        ) : null
      )}
    </Menu>
  );

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
              <Badge size="small">
                <Avatar
                  style={{ cursor: "pointer", background: "#ccc" }}
                  size={50}
                  icon={!user?.avatar && <UserOutlined />}
                  src={user?.avatar}
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
