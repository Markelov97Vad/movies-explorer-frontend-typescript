import './PortfolioLink.css'

type PortfolioLinkProps = {
  link: string;
  text: string;
}

function PortfolioLink({ link, text }: PortfolioLinkProps) {
  return ( 
    <a href={link} className='portfolio-link' target='_blank' rel="noreferrer">
    <span className='portfolio-link__text'>{text}</span>
    <span className='portfolio-link__icon'>&#8599;</span>
  </a>
  );
}

export default PortfolioLink;