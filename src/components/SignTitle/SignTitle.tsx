import Logo from '../UI/Logo/Logo';
import './SignTitle.css';

type SignTitleProps = {
  text: string
}

function SignTitle({text}: SignTitleProps) {
  return ( 
    <div className='sign-title'>
      <Logo />
      <h1 className='sign-title__text'>{text}</h1>
    </div>
  );
}

export default SignTitle;