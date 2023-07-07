import './ErrorMessage.css';

function ErrorMessage({ place, text } : { place: string; text: string}) {
  return (     
    <span className={`error-message error-message_place_${place}`}>{text}</span>
  );
}

export default ErrorMessage;