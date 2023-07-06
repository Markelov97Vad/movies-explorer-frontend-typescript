import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import Main from '../pages/Main/Main';

export type CurrentUser = {
  email: string;
  password: string;
  _id?: string;
}

function App() {
  const [loggetIn, setLoggetIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);


  // const [currentUser, setCurrentUser] = useState<CurrentUser>({
  //   email: '',
  //   password: '',
  //   _id: '',
  // });
  // const [loggetIn, serLoggetIn] = useState<boolean>(false)

  // const handleSignUp = ( props: UserData) => {
  //   return mainApi
  //     .register(props)
  //     // .then(() => handleAuthorize(inputValue))
  //     .catch((err) => {
  //       if (err === CONFLICT_CODE) {
  //         // setMessage(UNAUTHORIZED_ERROR_EMAIL_MESSAGE)
  //       }
  //       if (err === SERVER_ERROR_CODE) {
  //         // setMessage(SERVER_ERROR_SIGNUP_MESSAGE)
  //       }
  //       // setIsLoading(false)
  //     })
  //     // .finally(() => setIsLoading(false));
  // }

  // const handleSignIn = (props: UserData) => {
  //   return mainApi
  //     .authorize(props)
  //     .then((res: UserData )=> {
  //       setCurrentUser(res)
  //     })
  // }


  return (
    
    <div className="App">
      <CurrentUserContext.Provider value={{ loggetIn, currentUser }}>
        <Routes>
          <Route path='/' element={ <Main /> }/>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
