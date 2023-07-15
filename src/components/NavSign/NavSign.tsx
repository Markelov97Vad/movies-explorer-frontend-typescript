import NavLinkButton from '../UI/NavLinkButton/NavLinkButton';
import './NavSign.css'

function NavSign() {
  return ( 
    <nav className="navigation-sign">
      <ul className="navigation-sign__list">
        <li>
          <NavLinkButton
            text="Регистрация"
            place="header"
            type="link"
            link="/signup"
            color="black"
            onSignOut={() => null}
          />
        </li>
        <li>
          <NavLinkButton
            text="Войти"
            place="header"
            type="button"
            link="/signin"
            color="white"
            onSignOut={() => null}
          />
        </li>
      </ul>
    </nav>
   );
}

export default NavSign;