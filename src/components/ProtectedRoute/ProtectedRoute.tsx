import { Navigate } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import { ComponentType } from "react";

type ProtectedRouteProps = {
  component: ComponentType
}

function ProtectedRoute({ component: Component}: ProtectedRouteProps) {
  const { loggetIn } = useUserContext();

  if(!loggetIn) {
    return <Navigate to='/' replace />
  }
  return <Component/>;
}

export default ProtectedRoute;