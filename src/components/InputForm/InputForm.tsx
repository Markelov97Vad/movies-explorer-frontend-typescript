import './InputForm.css';
import { InputFormProps } from '../Types/props.types';

function InputForm({ value, onChange, isError, errorMessage, autoComplete, labelName, inputType, typeWight, name} : InputFormProps) {
  return ( 
    <div className='form-input'>
      <label className='form-input__label' htmlFor={name}>{labelName}</label>
      <input 
        value={value || ''}
        onChange={onChange}
        className={`form-input__input form-input__input_type_${typeWight} ${isError && 'form-input__input_type_active'}`}
        type={inputType}
        name={name}
        id={name}
        autoComplete={autoComplete}
        required
      />
      <span className='form-input__focus-span'></span>
      <span className={`form-input__error ${isError ? 'form-input__error_active' : ''}`}>{errorMessage}</span>
    </div>
  );
}

export default InputForm;