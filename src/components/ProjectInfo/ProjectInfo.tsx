import './ProjectInfo.css'

type ProjectInfoProps = {
  title: string;
  subtitle: string;
}

function ProjectInfo({title, subtitle}: ProjectInfoProps) {
  return ( 
    <article className='project-info__column'>
      <h3 className='project-info__title'>{title}</h3>
      <p className='project-info__subtitle'>
        {subtitle}
      </p>
    </article>
   );
}

export default ProjectInfo;