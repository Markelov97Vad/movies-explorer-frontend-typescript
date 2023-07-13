import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignTitle from "../SignTitle/SignTitle";
import SignForm from "../SignForm/SignForm";
import SignWrapper from "../Sign/Sign";
import useUserContext from "../../hooks/useUserContext";
import { IObjectValues } from "../../hooks/useFormValid";

type SignInProps = {
  onLogin: (inputValues: IObjectValues) => void;
  message: string;
  isLoading: boolean;
}

function SignIn({onLogin, message, isLoading}: SignInProps) {
  const { loggetIn } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (inputValues: IObjectValues) => {
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