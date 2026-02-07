import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.status === "loading") {
    return <div>loading ...</div>;
  }
  return <Outlet />;
};

export default ProtectedRoute;
