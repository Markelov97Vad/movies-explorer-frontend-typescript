import { Navigate } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import { ProtectedRouteProps } from "../Types/props.types";

function ProtectedRoute({authenticationPath, children}: ProtectedRouteProps) {
  const { loggetIn } = useUserContext();

  if(!loggetIn) {
    return <Navigate to={authenticationPath} replace />
  }
  return children;
}

export default ProtectedRoute;