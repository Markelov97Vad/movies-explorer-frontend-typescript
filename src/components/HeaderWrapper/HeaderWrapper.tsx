import { useState } from 'react';
import './HeaderWrapper.css'
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import NavHeader from '../NavHeader/NavHeader';

function HeaderWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuOpen = () => setIsMenuOpen(!isMenuOpen);
  return ( 
    <>
      <NavHeader />
      <div className="header-wrapper">
        <button
          type="button"
          className="header-wrapper__button-burger"
          onClick={handleMenuOpen}
        ></button>
        <HeaderMenu handleMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
      </div>
    </>
   );
}

export default HeaderWrapper;