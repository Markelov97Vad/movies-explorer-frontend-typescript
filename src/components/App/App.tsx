import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import Main from '../Main/Main';
import { mainApi } from '../../utils/MainApi';
import SignUp from '../SignUp/SignUp';
import { CONFLICT_CODE, SERVER_ERROR_CODE, SERVER_ERROR_SIGNIN_MESSAGE, SERVER_ERROR_SIGNOUT_MESSAGE, SERVER_ERROR_SIGNUP_MESSAGE, SUCCESS_MESSAGE, UNAUTHORIZED_CODE, UNAUTHORIZED_ERROR_AUTH_MESSAGE, UNAUTHORIZED_ERROR_CHECKTOKEN_MESSAGE, UNAUTHORIZED_ERROR_CONFIRM_MESSAGE, UNAUTHORIZED_ERROR_EMAIL_MESSAGE } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import MoviesContextProvider from '../../contexts/MoviesContextProvider';
import SavedMovies from '../SavedMovies/SavedMovies';
import SignIn from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import { CurrentUser } from '../Types/currentUser.types';
import { InputValuesType } from '../Types/InputValuesType';
import { ProtectedRouteProps } from '../Types/props.types';

function App() {
  const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false);
  const [loggetIn, setLoggetIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [IsErrorRequest, setIsErrorRequest] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignUp = (inputValues: InputValuesType) => {
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

  const handleSignIn = (inputValue: InputValuesType) => {
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

  const handleUserInfoChange = (userData: InputValuesType) => {
    setMessage('')
    setIsLoading(true);
    return mainApi
      .setUserInfo(userData)
      .then((userData)=> {
        setCurrentUser(userData);
        setIsEditing(false)
      })
      .catch((err) => {
        if (err === CONFLICT_CODE) {
          setMessage(UNAUTHORIZED_ERROR_EMAIL_MESSAGE);
        }
        setIsEditing(true)
        setIsErrorRequest(true)
        setIsLoading(false)
      })
      .finally(() => {
        setMessage(SUCCESS_MESSAGE)
        setIsLoading(false)
      })
  }

  const handleSignOut = () => {
    setMessage('')
    return mainApi
      .logout()
      .then(() => {
        setCurrentUser({} as CurrentUser);
        setLoggetIn(false);
      })
      .then(() => {
        localStorage.clear();
        sessionStorage.clear();
      })
      .catch(() => setMessage(SERVER_ERROR_SIGNOUT_MESSAGE))
      .finally(() =>  navigate('/', { replace: true }));
  }

  useEffect(() => {
    setMessage('');
  }, [navigate]);

  const handleOpenConfirm = () => {
    setIsEditing(true)
  }

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'children'> = {
    authenticationPath: '/',
  };

  return (
    
    <div className="root">
      <CurrentUserContext.Provider value={{ loggetIn, currentUser }}>
        { isAppLoaded && 
          <Routes>
            <Route path='/' element={ <Main /> }/>
            <Route path='/movies' element={
              <MoviesContextProvider>
                <ProtectedRoute 
                  {...defaultProtectedRouteProps}
                  children={ <Movies />}
                /> 
              </MoviesContextProvider>
            }/>
            <Route path='/saved-movies' element={
              <MoviesContextProvider>
                <ProtectedRoute 
                  {...defaultProtectedRouteProps}
                  children={ <SavedMovies />}
                  /> 
              </MoviesContextProvider>
            }/>
            <Route path='/profile' element={
              <MoviesContextProvider>
                <ProtectedRoute 
                  {...defaultProtectedRouteProps} 
                  children={
                    <Profile 
                      handleUserInfoChange={handleUserInfoChange}
                      isErrorRequest={IsErrorRequest}
                      isEditing={isEditing}
                      handleOpenConfirm={handleOpenConfirm}
                      message={message}
                      onSignOut={handleSignOut}
                      isLoading={isLoading}
                    />
                  }/> 
              </MoviesContextProvider>
            }/>
            <Route path='/signup' element={<SignUp onRegistration={handleSignUp}  message={message} isLoading={isLoading}/>} />
            <Route path='/signin' element={<SignIn onLogin={handleSignIn}  message={message} isLoading={isLoading}/>} />
          </Routes>
        }
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
