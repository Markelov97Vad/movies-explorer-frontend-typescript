import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";

function useUserContext() {
  const userContextValue = useContext(CurrentUserContext);
  return ( 
   {...userContextValue}
   );
}

export default useUserContext;