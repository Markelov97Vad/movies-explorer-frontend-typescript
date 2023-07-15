import './HeaderMenu.css';

import NavMenu from '../NavMenu/NavMenu';
import { HeaderMenuProps } from '../Types/props.types';
import ButtonCross from '../UI/ButtonCross/ButtonCross';
import NavigationLinkProfile from '../UI/NavigationLinkProfile/NavigationLinkProfile';

function HeaderMenu({ handleMenuOpen, isMenuOpen }: HeaderMenuProps) {
  const handleClick = () => {
    handleMenuOpen();
  }

  return ( 
    <div className={`header-menu ${isMenuOpen && 'header-menu_opened'}`}>
      <div className="header-menu__wrapper">
          <ButtonCross place='menu' handleClick={handleClick}/>
        <div className='header-menu__container'>
          <NavMenu />
          <NavigationLinkProfile />
        </div>
      </div>
    </div>
   );
}

export default HeaderMenu;