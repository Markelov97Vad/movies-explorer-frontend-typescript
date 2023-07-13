import './ButtonLike.css'

type ButtonLikeProps = {
  isOwner: boolean;
  handleClick: () => void;
}

function ButtonLike({ isOwner, handleClick}: ButtonLikeProps) {

  const cardLikeButtonClassname = `button-like ${isOwner? 'button-like_active' : ''}`

  return ( 
    <button className={cardLikeButtonClassname} onClick={handleClick} type='button'></button>
   );
}

export default ButtonLike;