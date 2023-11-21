import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "../../utils/ProtectedRouteUtil";
import { AuthProvider } from "../../contexts/AuthContext";
import HomePage from "../../pages/HomePage/HomePage";
import ProtectedPage from "../../pages/ProtectedPage/ProtectedPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginPage from "../../pages/LoginPage/LoginPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={<ProtectedRoute element={<ProtectedPage />} />}
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
