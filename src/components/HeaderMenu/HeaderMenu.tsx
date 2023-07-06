import NavMenu from '../NavMenu/NavMenu';
import ButtonCross from '../UI/ButtonCross/ButtonCross';
import NavigationLinkProfile from '../UI/NavigationLinkProfile/NavigationLinkProfile';
import './HeaderMenu.css';

type HeaderMenuProps = {
  handleMenuOpen: () => void;
  isMenuOpen: boolean;
}

function HeaderMenu({ handleMenuOpen, isMenuOpen }: HeaderMenuProps) {
  return ( 
    <div className={`header-menu ${isMenuOpen && 'header-menu_opened'}`}>
      <div className="header-menu__wrapper">
          <ButtonCross place='menu' handleMenuOpen={handleMenuOpen}/>
        <div className='header-menu__container'>
          <NavMenu />
          <NavigationLinkProfile />
        </div>
      </div>
    </div>
   );
}

export default HeaderMenu;