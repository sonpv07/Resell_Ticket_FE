import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Thêm Routes
import Router from "./routes/router";
import { AuthProvider } from "./context/AuthContext";
import { DialogProvider } from "./context/DialogContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DialogProvider>
          <Router />
        </DialogProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
