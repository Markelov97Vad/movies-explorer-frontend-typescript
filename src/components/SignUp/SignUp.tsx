import { useEffect } from "react";
import useUserContext from "../../hooks/useUserContext";
import { useLocation, useNavigate } from "react-router-dom";
import Sign from "../Sign/Sign";
import SignTitle from "../SignTitle/SignTitle";
import SignForm from "../SignForm/SignForm";
import { IObjectValues } from "../../hooks/useFormValid";

type SignUpProps = {
  onRegistration: (inputValues: IObjectValues) => void;
  message: string;
  isLoading: boolean;
}

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
  },[])

  const handleSubmit = (inputValues: IObjectValues) => {
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