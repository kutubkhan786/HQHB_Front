import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Dashboard from "./Pages/Dashoard";
import EditUser from "./Pages/EditUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Add more pages like this */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
