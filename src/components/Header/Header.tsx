import './Header.css'
import { useLocation } from "react-router-dom";
import useUserContext from '../../hooks/useUserContext';
import Logo from '../UI/Logo/Logo';
import NavSign from '../NavSign/NavSign';
import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';


function Header() {
 const { pathname } = useLocation();
  const { loggetIn } = useUserContext();

  return (
    <header
      className={`header ${
        pathname === "/" ? "header_type_landing" : "header_type_main"
      }`}
    >
      <Logo />
      {!loggetIn ? <NavSign /> : <HeaderWrapper />}
    </header>
  )
}

export default Header;