import React from "react";
import "./EditProfile.scss";
import EditItem from "../../../../components/user/edit/EditItem";
import { useLocation } from "react-router-dom";

const EDIT_TYPE = [
  {
    id: 0,
    title: "Email",
    subTitle: `In order to change your email, we'll send a confirmation email to verify your email address`,
  },

  {
    id: 1,
    title: "Name",
    subTitle: ``,
  },

  {
    id: 2,
    title: "Password",
    subTitle: `In order to change your password, we'll send a confirmation email to verify`,
  },
];

const USER_VALUE = {
  firstName: "Son",
  lastName: "Pham",
  email: "son@gmail.com",
};

export default function EditProfile() {
  const pathname = useLocation().pathname;

  const getEditType = () => {
    const currentPath = pathname.substring(pathname.lastIndexOf("/") + 1);

    return EDIT_TYPE.find(
      (item) => item.title.toLowerCase() === currentPath.toLowerCase()
    );
  };

  console.log(getEditType());

  return (
    <div className="edit-container">
      <div className="path">
        <p>Account</p>
        <p>/</p>
        <p>{getEditType().title}</p>
      </div>

      <EditItem
        title={getEditType().title}
        subTitle={getEditType().subTitle}
        userData={USER_VALUE}
        key={getEditType().id}
      />
    </div>
  );
}
