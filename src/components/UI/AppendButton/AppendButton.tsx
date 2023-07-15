import './AppendButton.css'
import { AppendButtonProps } from '../../Types/props.types';

function AppendButton({ onClick , text }: AppendButtonProps) {
  return ( 
    <button className="append-button" type='button' onClick={onClick}>{text}</button>
   );
}

export default AppendButton;