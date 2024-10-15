import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Thêm Routes
import Router from "./routes/router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
