import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DialogContext } from "../context/DialogContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const { openDialog, closeDialog } = useContext(DialogContext);
  const navigate = useNavigate();

  const handleOpenDialog = (caseForm) => {
    openDialog({
      title: "Alert",
      component: (
        <p>
          {caseForm === 1
            ? "Please Login to use further features"
            : caseForm === 2
            ? "You must register a package to use further features"
            : "You are not allowed to access"}
        </p>
      ),
      okCallback: () => {
        navigate("/");
        closeDialog();
      },
      okText: "Confirm",
    });
  };

  useEffect(() => {
    if (!user) {
      handleOpenDialog(1);
    } else if (
      user?.iD_Package === null &&
      user?.iD_RoleNavigation.name_role === "Customer" &&
      allowedRoles.includes(user?.iD_RoleNavigation.name_role)
    ) {
      handleOpenDialog(2);
    } else if (!allowedRoles.includes(user?.iD_RoleNavigation.name_role)) {
      handleOpenDialog(3);
    }
  }, [user, allowedRoles, navigate, closeDialog]);

  if (!user) {
    return null;
  }

  if (
    user?.iD_Package !== null &&
    user?.iD_RoleNavigation.name_role === "Customer" &&
    allowedRoles.includes(user?.iD_RoleNavigation.name_role)
  ) {
    return <Outlet />;
  }

  if (
    user?.iD_RoleNavigation.name_role !== "Customer" &&
    allowedRoles.includes(user?.iD_RoleNavigation.name_role)
  ) {
    return <Outlet />;
  }

  return null;
};

export default ProtectedRoute;
