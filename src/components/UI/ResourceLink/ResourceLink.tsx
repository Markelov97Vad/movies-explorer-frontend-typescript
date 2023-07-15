import './ResourceLink.css'
import { ResourceLinkProps } from '../../Types/props.types';

function ResourceLink({ place, href, text}: ResourceLinkProps) {
  return ( 
    <a className={`resource-link resource-link_place_${place}`} href={href} target="_blank" rel='noreferrer'>{text}</a>
   );
}

export default ResourceLink;