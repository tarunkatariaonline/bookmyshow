import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Header from "../../shared/components/Header";
import UserLayout from "../layouts/UserLayout";
import Home from "../../pages/user/Home";
import ProtectedRoute from "./guards/ProtectedRoute";
const AppRoutes = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute roles={["user"]} />}>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
            </Route>
          </Route>
          {/* normal routes */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
