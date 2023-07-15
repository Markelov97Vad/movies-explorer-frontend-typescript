import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignTitle from "../SignTitle/SignTitle";
import SignForm from "../SignForm/SignForm";
import SignWrapper from "../Sign/Sign";
import useUserContext from "../../hooks/useUserContext";
import { InputValuesType } from "../Types/InputValuesType";

type SignInProps = {
  onLogin: (inputValues: InputValuesType) => void;
  message: string;
  isLoading: boolean;
}

function SignIn({onLogin, message, isLoading}: SignInProps) {
  const { loggetIn } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (inputValues: InputValuesType) => {
    onLogin(inputValues);
  };

  useEffect(() => {
    if ( loggetIn && pathname === '/signin') {
      navigate('/movies', { replace: true })
    } else {
      navigate(pathname);
    }
  },[loggetIn, navigate, pathname])

  return (
    <SignWrapper>
      <SignTitle text="Рады видеть!" />
      <SignForm 
        handleSubmit={handleSubmit} 
        nameForm='signin' 
        message={message}
        isLoading={isLoading}
      />
    </SignWrapper>
  );
}

export default SignIn;