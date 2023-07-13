import './AppendButton.css'

type AppendButtonProps = {
  onClick: () => void;
  text: string;
}

function AppendButton({ onClick , text }: AppendButtonProps) {
  return ( 
    <button className="append-button" type='button' onClick={onClick}>{text}</button>
   );
}

export default AppendButton;