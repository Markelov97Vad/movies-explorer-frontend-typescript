import './Techs.css'
import { iconsText } from "../../utils/config";
import Headline from "../Headline/Headline";

function Techs() {
  return ( 
    <section className='techs-info'>
      <Headline title='Технологии'/>
        <h3 className='techs-info__title'>7 технологий</h3>
        <p className='techs-info__subtitle'>
          На курсе веб-разработки мы освоили технологии, 
          которые применили в дипломном проекте.
        </p>
        <ul className='techs-info__list'>
          {
            iconsText.map((el, i) => (
              <li key={i} className='techs-info__icon'>{el}</li>
            ))
          }
        </ul>
    </section>
   );
}

export default Techs;