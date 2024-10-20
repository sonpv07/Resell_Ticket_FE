import { Spin } from "antd";
import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        height: "60vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" />;
    </div>
  );
}
