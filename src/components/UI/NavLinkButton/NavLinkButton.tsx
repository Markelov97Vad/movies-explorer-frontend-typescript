import { useLocation, useNavigate } from 'react-router-dom';
import './NavLinkButton.css';

type NavLinkButtonProps = {
  text: string;
  place: string;
  type: string;
  color: string;
  link: string;
  isNotFoundPage?: boolean;
  onSignOut: () => void | null;
}

function NavLinkButton({ text , place, type, link = '', color, onSignOut, isNotFoundPage = false }: NavLinkButtonProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (pathname !== '/profile') {
      if( isNotFoundPage ) {
        navigate(-1)
      } else {
        navigate(`${link}`, {replace: true})
      }
    } else if ( pathname === '/profile') {
      onSignOut()
    }
  }

  return ( 
    <button onClick={handleClick} type='button' className={
      `navigation-link-sign__button navigation-link-sign__button_place_${place} navigation-link-sign__button_type_${type} navigation-link-sign__button_color_${color}`
    }>
      {text}
    </button>
   );
}

export default NavLinkButton;