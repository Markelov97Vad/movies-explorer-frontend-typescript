import { ReactNode } from 'react';
import './Sign.css';
import { ChildrenPropsType } from '../Types/props.types';

function Sign({children}: ChildrenPropsType) {
  return ( 
    <main className="sign">
      <section className='sign__wrapper'>
        {children}
      </section>
    </main>
   );
}

export default Sign;