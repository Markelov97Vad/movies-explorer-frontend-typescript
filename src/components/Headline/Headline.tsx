import './Headline.css';

function Headline({ title }: { title: string}) {
  return ( 
    <h2 className='headline'>{title}</h2>
   );
}

export default Headline;