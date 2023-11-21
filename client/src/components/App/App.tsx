import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "../../pages/HomePage/HomePage";
import ProtectedPage from "../../pages/ProtectedPage/ProtectedPage";
import SignIn from "../Auth/SignIn";
import { ProtectedRoute } from "../../routes/ProtectedRoute";
import { AuthProvider } from "../../contexts/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/protected"
            element={<ProtectedRoute element={<ProtectedPage />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
