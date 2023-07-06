import './ResourceLink.css'

type ResourceLinkProps = {
  href: string;
  place: string;
  text: string;
}

function ResourceLink({ place, href, text}: ResourceLinkProps) {
  return ( 
    <a className={`resource-link resource-link_place_${place}`} href={href} target="_blank" rel='noreferrer'>{text}</a>
   );
}

export default ResourceLink;