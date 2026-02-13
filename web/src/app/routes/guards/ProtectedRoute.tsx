import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { Outlet, Navigate } from "react-router-dom";
interface protectedRouteProps {
  roles: string[];
}
const ProtectedRoute = ({ roles }: protectedRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth.user;
  if (auth.status === "loading") {
    return <div>loading ...</div>;
  }

  if (auth.status === "idle") {
    return <Navigate to="/login" replace />;
  }
  if (auth.status === "authenticated" && user && roles.includes(user.role as string)) {
    return <Outlet />;
  }

  if (auth.status === "authenticated" && user && !roles.includes(user.role as string)) {
    return <div>now allowed..</div>;
  }
};

export default ProtectedRoute;
