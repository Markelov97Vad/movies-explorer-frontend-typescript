import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import Main from '../pages/Main/Main';
import { mainApi } from '../../utils/MainApi';
import SignUp from '../SignUp/SignUp';
import { IObjectValues } from '../../hooks/useFormValid';
import { CONFLICT_CODE, SERVER_ERROR_CODE, SERVER_ERROR_SIGNIN_MESSAGE, SERVER_ERROR_SIGNUP_MESSAGE, UNAUTHORIZED_CODE, UNAUTHORIZED_ERROR_AUTH_MESSAGE, UNAUTHORIZED_ERROR_CHECKTOKEN_MESSAGE, UNAUTHORIZED_ERROR_CONFIRM_MESSAGE, UNAUTHORIZED_ERROR_EMAIL_MESSAGE } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import MoviesContextProvider from '../../contexts/MoviesContextProvider';

export type CurrentUser = {
  email: string;
  password: string;
  name?: string;
  _id?: string;
}

function App() {
  const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false);
  const [loggetIn, setLoggetIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null | Response>(null);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleSignUp = (inputValues: IObjectValues) => {
    setIsLoading(true)
    mainApi
      .register(inputValues)
      .then((res) => {
        console.debug(res);
        
        handleSignIn(inputValues)
      })
      .catch((err) => {
        if (err === CONFLICT_CODE) {
          setMessage(UNAUTHORIZED_ERROR_EMAIL_MESSAGE)
        }
        if (err === SERVER_ERROR_CODE) {
          setMessage(SERVER_ERROR_SIGNUP_MESSAGE)
        }
        setIsLoading(false)
      })
      .finally(() => setIsLoading(false));


  }

  const handleSignIn = (inputValue: IObjectValues) => {
    setMessage('')
    setIsLoading(true);
    return mainApi
      .authorize(inputValue)
      .then((res) => {
        setLoggetIn(true);
        setCurrentUser(res);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        if (err === UNAUTHORIZED_CODE) {
          setMessage(UNAUTHORIZED_ERROR_CONFIRM_MESSAGE);
        }
        if (err === SERVER_ERROR_CODE) {
          setMessage(SERVER_ERROR_SIGNIN_MESSAGE);
        }
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  const handleTockenCheck = useCallback(() => {
    return mainApi
      .checkToken()
      .then((res) => {
        setLoggetIn(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        err === UNAUTHORIZED_CODE
          ? console.log(UNAUTHORIZED_ERROR_AUTH_MESSAGE)
          : console.log(UNAUTHORIZED_ERROR_CHECKTOKEN_MESSAGE, err);
      })
      .finally(() => {
        setIsAppLoaded(true);
      });
  }, []);

  useEffect(() => {
    handleTockenCheck();
  }, [handleTockenCheck]);

  return (
    
    <div className="root">
      <CurrentUserContext.Provider value={{ loggetIn, currentUser }}>
        { isAppLoaded && 
          <Routes>
            <Route path='/' element={ <Main /> }/>
            <Route path='/movies' element={
              <MoviesContextProvider>
                <ProtectedRoute component={Movies} /> 
              </MoviesContextProvider>
            }/>
            {/* <ProtectedRoute component={Main} /> */}
              {/* <Movies/> */}
              {/* <Route path='/movies' element={ <Movies />} /> */}
            <Route path='/signup' element={<SignUp onRegistration={handleSignUp}  message={message} isLoading={isLoading}/>} />
            {/* <Route path='/signip' element={<SignIn onLogin={handleSignIn}  message={message} isLoading={isLoading}/>} /> */}
          </Routes>
        }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
