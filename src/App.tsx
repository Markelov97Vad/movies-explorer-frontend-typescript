import { useState } from 'react';
import './App.css';
import { CurrentUserContext } from './contexts/currentUserContext';
import { UserData, mainApi } from './utils/MainApi';
import { CONFLICT_CODE, SERVER_ERROR_CODE, SERVER_ERROR_SIGNUP_MESSAGE, UNAUTHORIZED_ERROR_EMAIL_MESSAGE } from './utils/constants';

function App() {
  type CurrentUser = {
    email: string;
    password: string;
    _id?: string;
  }

  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    email: '',
    password: '',
    _id: '',
  });
  const [loggetIn, serLoggetIn] = useState<boolean>(false)

  const handleSignUp = ( props: UserData) => {
    return mainApi
      .register(props)
      // .then(() => handleAuthorize(inputValue))
      .catch((err) => {
        if (err === CONFLICT_CODE) {
          // setMessage(UNAUTHORIZED_ERROR_EMAIL_MESSAGE)
        }
        if (err === SERVER_ERROR_CODE) {
          // setMessage(SERVER_ERROR_SIGNUP_MESSAGE)
        }
        // setIsLoading(false)
      })
      // .finally(() => setIsLoading(false));
  }

  const handleSignIn = (props: UserData) => {
    return mainApi
      .authorize(props)
      .then((res: UserData )=> {
        setCurrentUser(res)
      })
  }


  return (
    <div className="App">
      <CurrentUserContext.Provider value={{ loggetIn, currentUser}}>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
