import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../../pages/auth/Login";
import Header from "../../shared/components/Header";
import UserLayout from "../layouts/UserLayout";
import Home from "../../pages/user/Home";
const AppRoutes = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
          </Route>
          {/* normal routes */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
