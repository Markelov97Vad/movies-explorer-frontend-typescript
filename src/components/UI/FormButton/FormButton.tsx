import { useLocation } from 'react-router-dom';
import './FormButton.css';
import { loadingMessage } from '../../../utils/config';
import { FormButtonProps } from '../../Types/props.types';

function FormButton({ text, isLoading, disabled }: FormButtonProps) {
  const { pathname } = useLocation();
  
  const handleRequest = () => {
    if (pathname === '/signup') {
      return loadingMessage.signup
    }
    if (pathname === '/signin') {
      return loadingMessage.signin
    }
    if (pathname === '/profile') {
      return loadingMessage.profile
    }
  }

  return ( 
    <button 
      type='submit' 
      className='form-button'
      disabled={disabled}
    >
        {isLoading ? handleRequest() :  text}
    </button>
   );
}

export default FormButton;