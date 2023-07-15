import './NavigationLink.css'
import { NavLink } from 'react-router-dom';
import { NavigationLinkProps } from '../../Types/props.types';

function NavigationLink({ path , place, text} : NavigationLinkProps) {
  return ( 
    <NavLink to={path} className={({isActive}) => `navigation-link navigation-link_place_${place} ${isActive ? (place === 'header' ? 'navigation-link_header-active' : 'navigation-link_menu-active') : ''}`}>{text}</NavLink>

   );
}

export default NavigationLink;