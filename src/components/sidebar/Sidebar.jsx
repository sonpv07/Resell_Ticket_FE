import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaUser,
  FaCalendarAlt,
  FaTicketAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/admin-dashboard">
            <FaHome />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin-dashboard/order">
            <FaShoppingCart />
            <span>Order</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin-dashboard/user">
            <FaUser />
            <span>User</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin-dashboard/package">
            <FaCalendarAlt />
            <span>Package</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin-dashboard/ticket">
            <FaTicketAlt />
            <span>Ticket</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
