import { linksList } from '../../utils/config';
import PortfolioLink from '../PortfolioLink/PortfolioLink';
import './PortfolioLinksList.css'

function PortfolioLinksList() {
  return ( 
    <ul className='portfolio-projects'>
      {linksList.map((link) => (
        <li key={link.id} className='portfolio-projects__list'>
          <PortfolioLink link={link.link} text={link.text} />
        </li>
      ))}
    </ul>
   );
}

export default PortfolioLinksList;