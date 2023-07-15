import './NavHeader.css'
import NavigationLink from '../UI/NavigationLink/NavigationLink';
import NavigationLinkProfile from '../UI/NavigationLinkProfile/NavigationLinkProfile';

function NavHeader() {
  return ( 
    <nav className="navigation-header">
      <ul className="navigation-header__list">
        <li>
          <NavigationLink 
            place="header" 
            text="Фильмы" 
            path="/movies" />
        </li>
        <li>
          <NavigationLink
            place="header"
            text="Сохраненные фильмы"
            path="/saved-movies"
          />
        </li>
      </ul>
      <NavigationLinkProfile />
    </nav>
   );
}

export default NavHeader;