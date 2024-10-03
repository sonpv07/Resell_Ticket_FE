import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(null);

  const [refreshToken, setRefreshToken] = useState(null);

  const [showForm, setShowForm] = useState("");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        showForm,
        setShowForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
