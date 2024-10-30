import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar"; // Sidebar component
import "./Layout.scss";

export default function Layout() {
  const location = useLocation();

  // Kiểm tra nếu URL chứa '/admin' để hiển thị Sidebar
  const isAdminPage = location.pathname.includes("/admin-dashboard");

  return (
    <div className="layout">
      <Header />
      <div className={`main-content ${isAdminPage ? "admin-layout" : ""}`}>
        {isAdminPage && <Sidebar />}
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
