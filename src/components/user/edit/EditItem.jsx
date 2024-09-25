import React from "react";
import "./EditItem.scss";
import EditForm from "./form/EditForm";

function EditItem({ title, subTitle, userData }) {
  return (
    <div className="edit-item-container">
      <h1 className="title">{title}</h1>
      <p className="sub-title">{subTitle}</p>

      <EditForm path={title} userData={userData} />
    </div>
  );
}

export default EditItem;
