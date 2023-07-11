import { ChangeEvent, useCallback, useLayoutEffect, useRef, useState } from "react";
import { validationConfig, validationConfigKeyProps } from "../utils/validation";

export type IObjectValues = {
  // [index: string]: string
  name?: string;
  email?: string;
  password?: string;
  // ckeckbox: ?
}

type ErrorMessageType = {
  [index: string]: string;
}

function useFormValid() {
  const [inputValues, setInputValues] = useState<IObjectValues | null>(null);
  const [checkboxValues, setCheckboxValues] = useState<IObjectValues | null>(null)
  const [errorMessages, setErrorMessages] = useState<ErrorMessageType>({});
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleStoreValues = (name: string, value: string) => {
    setInputValues(current => ({
      ...current,
      [name]: value,
    }))
    setCheckboxValues(current => ({
      ...current,
      [name]: value,
    }))
  }

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxValues(current => ({ 
      ...current, 
      [name]: checked,
    }));
  }

  const resetFormValues = useCallback((newValues = {}, newError = {} , newIsValid = true) => {
    setInputValues(newValues);
    setCheckboxValues(newValues)
    setErrorMessages(newError);
    setFormIsValid(newIsValid);
    // console.log('newIsValid',newIsValid);
    
  }, [setInputValues, setErrorMessages, setFormIsValid]);


  const handleErrorMessage = (name: string, message: string) => {
    setErrorMessages(current => ({
      ...current,
      [name]: message,
    }))
  }

  function handleDefaultValidation(name: string, validationMessage: string) {
    const isValid = formRef.current?.checkValidity();
    // console.log('isValid!',isValid);
    handleErrorMessage(name, validationMessage)
    // оператор утверждения, что значение не равно null
    setFormIsValid(isValid!);
  }

  const handleCustomValidation = (name: validationConfigKeyProps, value: string) => {
    // console.debug("name", name)
    const { pattern, validationError, emptyError } = validationConfig[name];

    const match = pattern.test(value);
    const message = !value ? emptyError : match ? '' : validationError;
    // неправельный тип
    handleErrorMessage(name, message);
  }

  function handleSaveFormRef(evt: ChangeEvent<HTMLInputElement>) {
    // оператор логического нулевого присваивани, присваивает значение, только если x является нулевым
    formRef.current ??= evt.target.closest('form');
    // formRef.current = formRef.current ?? evt.target.closest('form');

  }
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>, config = { customValidation: false }) => {
    const { name, value, validationMessage } = evt.target;

    handleStoreValues(name, value);
    handleSaveFormRef(evt);

    if (config.customValidation) {
      // const nameType: keyof ValidationConfigType1 | string = name
      // let nameType: validationConfigKeyProps = name as unknown as validationConfigKeyProps;
      handleCustomValidation(name as unknown as validationConfigKeyProps, value)
    } else {
      handleDefaultValidation(name, validationMessage);
    }
  }

  useLayoutEffect(() => {
    const isValid = formRef.current?.checkValidity();
    // console.log('IsValid2', isValid);
    
    const isError = Object.keys(errorMessages).some(name => errorMessages[name]);
    // console.log('isError', isError);
    // console.log('errorMessages', errorMessages);


    setFormIsValid(() => Boolean(isValid) && !isError);
  }, [inputValues, errorMessages])

  return {
    inputValues,
    handleInputChange,
    formIsValid,
    errorMessages,
    resetFormValues,
    handleToggleChange,
    checkboxValues
  }
}

export default useFormValid;