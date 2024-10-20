import React, { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DialogContext } from "../context/DialogContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
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

  if (!user) {
    return handleOpenDialog(1);
  }

  if (
    user?.iD_Package !== null &&
    user?.iD_RoleNavigation.name_role === "Customer" &&
    allowedRoles.includes(user?.iD_RoleNavigation.name_role)
  ) {
    console.log("allow 1");

    return <Outlet />;
  } else if (
    user?.iD_Package === null &&
    user?.iD_RoleNavigation.name_role === "Customer" &&
    allowedRoles.includes(user?.iD_RoleNavigation.name_role)
  ) {
    return handleOpenDialog(2);
  }

  if (
    user?.iD_RoleNavigation.name_role !== "Customer" &&
    allowedRoles.includes(user?.iD_RoleNavigation.name_role)
  ) {
    return <Outlet />;
  } else {
    return handleOpenDialog(3);
  }
};

export default ProtectedRoute;
