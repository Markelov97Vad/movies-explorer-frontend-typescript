import './SignForm.css'
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InputForm from '../InputForm/InputForm';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';
import FormButton from '../UI/FormButton/FormButton';
import NavLinkButton from '../UI/NavLinkButton/NavLinkButton';
import useFormValid from '../../hooks/useFormValid';
import { SignFormProps } from '../Types/props.types';

function SignForm({ handleSubmit, nameForm, message, isLoading }: SignFormProps) {
  const { pathname } = useLocation();
  const { 
    inputValues, 
    handleInputChange, 
    errorMessages, 
    resetFormValues, 
    formIsValid 
  } = useFormValid();

  useEffect(() => {
    resetFormValues()
  }, [resetFormValues]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(inputValues!);
  };

  return (
    <form className="sign-form" onSubmit={onSubmit} name={nameForm} noValidate>
      <div className="sign-form__wrapper">
        {pathname === "/signup" && (
          <InputForm
            value={inputValues?.name}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => handleInputChange(evt, { customValidation: true })}
            isError={errorMessages?.name}
            errorMessage={errorMessages?.name}
            labelName="Имя"
            typeWight="normal"
            inputType="text"
            name="name"
            autoComplete='on'
          />
        )}
        <InputForm
          value={inputValues?.email}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => handleInputChange(evt, { customValidation: true })}
          isError={errorMessages?.email}
          errorMessage={errorMessages?.email}
          labelName="E-mail"
          typeWight="bold"
          inputType="email"
          name="email"
          autoComplete='on'
        />
        <InputForm
          value={inputValues?.password}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => handleInputChange(evt, { customValidation: true })}
          isError={errorMessages?.password}
          errorMessage={errorMessages?.password}
          labelName="Пароль"
          typeWight="normal"
          inputType="password"
          name="password"
          autoComplete='current-password'
        />
      </div>
      <div className="sign-form__control-wrapper">
        <ErrorMessage text={message} place='sign-form'/>
        {pathname === "/signin" ? (
          <FormButton text="Войти" disabled={!formIsValid} isLoading={isLoading}/>
        ) : (
          <FormButton text="Зарегистрироваться" disabled={!formIsValid} isLoading={isLoading}/>
        )}
        {pathname === "/signin" ? (
          <span className="sign-form__span">
            Ещё не зарегистрированы?
            <NavLinkButton
              text="Регистрация"
              link="/signup"
              place="sign"
              type="link"
              color="blue"
              onSignOut={() => null}
            />
          </span>
        ) : (
          <span className="sign-form__span">
            Уже зарегистрированы?
            <NavLinkButton
              text="Войти"
              link="/signin"
              place="sign"
              type="link"
              color="blue"
              onSignOut={() => null}
            />
          </span>
        )}
      </div>
    </form>
  )
}

export default SignForm;