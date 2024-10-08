import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";  // Thêm Routes
import Router from "./routes/router";
import CreateTicketPage from './pages/Ticket/CreateTicketPage';

function App() {
  return (
    <BrowserRouter>
      {/* Bọc các Route bên trong Routes */}
      <Routes>
        <Route path="/" element={<Router />} />
        <Route path="/create-ticket" element={<CreateTicketPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
