import './SignTitle.css';
import Logo from '../UI/Logo/Logo';

function SignTitle({ text }: { text: string}) {
  return ( 
    <div className='sign-title'>
      <Logo />
      <h1 className='sign-title__text'>{text}</h1>
    </div>
  );
}

export default SignTitle;