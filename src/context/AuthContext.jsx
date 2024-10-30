import React, { createContext, useEffect, useState } from "react";
import UserService from "../services/user.service";
import NotificationService from "../services/notification.service";

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

  const [notification, setNotification] = useState([]);

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

  const fetchUserData = async () => {
    const userData = await UserService.getProfile(user?.iD_Customer);

    if (userData.success) {
      setUser(userData.data);
      localStorage.setItem("user", JSON.stringify(userData.data));

      // const notificationResponse =
      //   await NotificationService.getNotificationByUser(user?.iD_Customer);

      // if (notificationResponse.success) {
      //   setNotification(notificationResponse.data.reverse());
      // }
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserData();
    }
  }, []);

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
        notification,
        setNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
