import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "../../utils/ProtectedRouteUtil";
import { AuthProvider } from "../../contexts/AuthContext";
import HomePage from "../../pages/HomePage/HomePage";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { NavigationPages } from "../../constants/NavigationPages";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path={NavigationPages.Home} element={<HomePage />} />
          <Route path={NavigationPages.Login} element={<LoginPage />} />
          <Route
            path={NavigationPages.Category}
            element={<ProtectedRoute element={<CategoryPage />} />}
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
