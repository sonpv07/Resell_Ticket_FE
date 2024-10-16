import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem("refreshToken") || null;
  });

  const [showForm, setShowForm] = useState("");

  // Khi set accessToken hoặc refreshToken, lưu vào localStorage để duy trì khi làm mới trang
  const handleSetAccessToken = (token) => {
    setAccessToken(token);
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  const handleSetRefreshToken = (token) => {
    setRefreshToken(token);
    if (token) {
      localStorage.setItem("refreshToken", token);
    } else {
      localStorage.removeItem("refreshToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken: handleSetAccessToken,
        refreshToken,
        setRefreshToken: handleSetRefreshToken,
        showForm,
        setShowForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
