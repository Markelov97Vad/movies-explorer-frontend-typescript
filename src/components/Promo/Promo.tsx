import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';

function Promo() {
  return ( 
    <section className='promo'>
      <img className='promo__image' src={landingLogo} alt="изображение Мир вэба" />
      <div className='promo__info'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
      <nav className='promo__navigation'>
        <a href='#about' className='promo__link'>Узнать больше</a>
      </nav>
    </section>
   );
}

export default Promo;