import { Navigate } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";



export type ProtectedRouteProps = {
  // component: ComponentType;
  authenticationPath: string;
  outlet: JSX.Element;
}

function ProtectedRoute({authenticationPath, outlet}: ProtectedRouteProps) {
  const { loggetIn } = useUserContext();

  if(!loggetIn) {
    return <Navigate to={authenticationPath} replace />
  }
  return outlet;
}

export default ProtectedRoute;