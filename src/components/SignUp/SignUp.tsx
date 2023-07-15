import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useUserContext from "../../hooks/useUserContext";
import Sign from "../Sign/Sign";
import SignTitle from "../SignTitle/SignTitle";
import SignForm from "../SignForm/SignForm";
import { InputValuesType } from "../Types/InputValuesType";
import { SignUpProps } from "../Types/props.types";

function SignUp({ onRegistration , message, isLoading}: SignUpProps) {
  const { loggetIn } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ( loggetIn && pathname === '/signup') {
      navigate('/movies', { replace: true })
    } else {
      navigate(pathname);
    }
  },[loggetIn, navigate, pathname])

  const handleSubmit = (inputValues: InputValuesType) => {
    onRegistration(inputValues)
  };
  return (
    <Sign>
      <SignTitle text="Добро пожаловать!" />
      <SignForm
        handleSubmit={handleSubmit} 
        nameForm='signup' 
        message={message}
        isLoading={isLoading}
      />
    </Sign>
   );
}

export default SignUp;