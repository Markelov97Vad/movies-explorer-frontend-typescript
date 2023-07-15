import './AboutMe.css'
import Headline from '../Headline/Headline';
import photo from '../../images/avatar-img.png';
import { linksResources } from '../../utils/config';
import ResourceLink from '../UI/ResourceLink/ResourceLink';

function AboutMe() {
  return ( 
    <section className='student-info'>
      <Headline title='Студент'/>
      <article className="student-info__card">
        <div className="student-info__description">
          <h3 className="student-info__title">Вадим</h3>
          <p className="student-info__subtitle">Фронтенд-разработчик, 26 лет</p>
          <p className="student-info__paragraph">
            Я родился и живу в Санкт-Петербурге, в прошлом хореограф, видеограф и монтажёр. 
            Обожаю путешествовать, побывал в 16 странах. Зимой занимаюсь лыжами,
            а летом увлекаюсь бегом. С начала осени 2022 года начал кодить. 
            Заканчиваю курсы в Яндекс.Практикуме.
            Планирую дальше развиватся в этом направлении.
          </p>
          <ResourceLink href={linksResources.github} place='about-me' text='Github'/>
        </div>
        <img className="student-info__image" src={photo} alt="Фото студента"/>
      </article>
    </section>
   );
}

export default AboutMe;