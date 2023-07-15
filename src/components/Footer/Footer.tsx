import { linksResources } from '../../utils/config';
import ResourceLink from '../UI/ResourceLink/ResourceLink';
import './Footer.css'

function Footer() {
  return (
    <footer className='footer root__foter'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__content-wrapper'>
        <span className='footer__copyright'>&copy; {new Date().getFullYear()}</span>
        <nav className='footer__links'>
          <ul className='footer__list'>
            <li>
              <ResourceLink href={linksResources.yandexPracticum} text='Яндекс.Практикум' place='footer'/>
            </li>
            <li>
              <ResourceLink href={linksResources.github} text='Github' place='footer'/>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
};

export default Footer;