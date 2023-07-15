import Headline from '../Headline/Headline';
import ProjectInfo from '../ProjectInfo/ProjectInfo';
import './AboutProject.css'

function AboutProject() {
  return ( 
    <section id='about' className='project-info'>
      <Headline title='О проекте'/>
      <div className='project-info__columns'>
        <ProjectInfo title='Дипломный проект включал 5 этапов' subtitle='Составление плана, работу над бэкендом, 
          вёрстку, добавление функциональности и финальные доработки.'/>
        <ProjectInfo title='На выполнение диплома ушло 5 недель' subtitle='У каждого этапа был мягкий и жёсткий дедлайн, 
          которые нужно было соблюдать, чтобы успешно защититься.'/>
      </div>
      <div className='project-timeline'>
        <div className='project-timeline__scale project-timeline__scale_type_backend'>
          <span className='project-timeline__title project-timeline__title_type_backend'>1 неделя</span>
        </div>
        <div className='project-timeline__scale project-timeline__scale_type_frontend'>
          <span className='project-timeline__title project-timeline__title_type_frontend'>4 недели</span>
        </div>
        <div className='project-timeline__scale'>
          <span className='project-timeline__title project-timeline__title_type_explanation'>Back-end</span>
        </div>
        <div className='project-timeline__scale'>
          <span className='project-timeline__title project-timeline__title_type_explanation'>Front-end</span>
        </div>

      </div>
    </section>
  );
}

export default AboutProject;