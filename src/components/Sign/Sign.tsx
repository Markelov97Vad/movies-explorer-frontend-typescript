import { ReactNode } from 'react';
import './Sign.css';

type SignProps = {
  children: ReactNode
}

function Sign({children}: SignProps) {
  return ( 
    <main className="sign">
      <section className='sign__wrapper'>
        {children}
      </section>
    </main>
   );
}

export default Sign;