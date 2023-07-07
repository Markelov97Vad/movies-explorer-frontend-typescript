import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUserContext';
import Main from '../pages/Main/Main';
import { mainApi } from '../../utils/MainApi';
import SignUp from '../SignUp/SignUp';
import { IObjectValues } from '../../hooks/useFormValid';

export type CurrentUser = {
  email: string;
  password: string;
  _id?: string;
}

function App() {
  const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false);
  const [loggetIn, setLoggetIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = (inputValues: IObjectValues) => {
    setIsLoading(true)
    // mainApi.register()
  }

  return (
    
    <div className="root">
      <CurrentUserContext.Provider value={{ loggetIn, currentUser }}>
        <Routes>
          <Route path='/' element={ <Main /> }/>
          <Route path='/signup' element={<SignUp onRegistration={handleSignUp}  message={message} isLoading={isLoading}/>} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
