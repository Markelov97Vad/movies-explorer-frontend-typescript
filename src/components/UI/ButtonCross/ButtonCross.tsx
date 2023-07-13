import './ButtonCross.css';

type ButtonCrossProps = {
  handleMenuOpen?: () => void;
  place?: string;
}

function ButtonCross({ handleMenuOpen, place }: ButtonCrossProps) {
  return ( 
    <button onClick={handleMenuOpen} type='button' className={`button-cross button-cross_place_${place}`}></button>

   );
}

export default ButtonCross;