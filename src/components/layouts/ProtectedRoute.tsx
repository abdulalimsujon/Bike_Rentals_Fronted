import { useNavigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const token = useAppSelector(selectCurrentToken);

  if (!token) {
    navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
