import PortfolioLinksList from '../PortfolioLinksList/PortfolioLinksList';
import './Portfolio.css'

function Portfolio() {
  return ( 
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <PortfolioLinksList />
    </section>
   );
}

export default Portfolio;