import './ButtonCross.css';
import { ButtonCrossProps } from '../../Types/props.types';

function ButtonCross({ handleClick, place }: ButtonCrossProps) {
  return ( 
    <button onClick={handleClick} type='button' className={`button-cross button-cross_place_${place}`}></button>
   );
}

export default ButtonCross;