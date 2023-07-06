import './Headline.css';

type HeadlineProps = {
  title: string;
}

function Headline(props: HeadlineProps) {
  return ( 
    <h2 className='headline'>{props.title}</h2>
   );
}

export default Headline;