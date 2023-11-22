import { Route, Routes } from "react-router-dom";
import { NavigationPages } from "../constants/NavigationPages";
import { ProtectedRoute } from "../utils/ProtectedRouteUtil";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import CategoryPage from "../pages/Category/CategoryPage";
import TransactionPage from "../pages/Transaction/TransactionPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={NavigationPages.Home} element={<HomePage />} />
      <Route path={NavigationPages.Login} element={<LoginPage />} />
      <Route
        path={NavigationPages.Category}
        element={<ProtectedRoute element={<CategoryPage />} />}
      />
      <Route
        path={NavigationPages.Transaction}
        element={<ProtectedRoute element={<TransactionPage />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
