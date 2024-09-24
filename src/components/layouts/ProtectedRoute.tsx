import { Navigate, useNavigate } from "react-router-dom";
import { logout, selectCurrentToken } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { ReactNode } from "react";
import { verifyToken } from "../../utils/verifyToken";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string | undefined;
}) => {
  const navigate = useNavigate();
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useDispatch();

  if (!token) {
    navigate("/login");
  }

  let user;

  if (token) {
    user = verifyToken(token);
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>; // Render children when token exists
};

export default ProtectedRoute;
