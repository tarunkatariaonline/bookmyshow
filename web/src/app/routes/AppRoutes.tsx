import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import UserLayout from "@/app/layouts/UserLayout";
import Home from "@/pages/user/Home";
import ProtectedRoute from "@/app/routes/guards/ProtectedRoute";

const AppContent = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute roles={["user"]} />}>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default AppRoutes;
