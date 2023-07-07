import { ChangeEvent, FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import { validationConfig, validationConfigKeyProps } from "../utils/validation";

export type IObjectValues = {
  [index: string]: string
}

function useFormValid(values = {}) {
  const [inputValues, setInputValues] = useState<IObjectValues>(values);
  const [checkboxValues, setCheckboxValues] = useState<IObjectValues>({})
  const [errorMessages, setErrorMessages] = useState<IObjectValues>({});
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
    setCheckboxValues({ ...values, [name]: checked })
  }

  const resetFormValues = useCallback((newValues = {}, newError = {}, newIsValid = false) => {
    setInputValues(newValues);
    setCheckboxValues(newValues)
    setErrorMessages(newError);
    setFormIsValid(newIsValid);
  }, [setInputValues, setErrorMessages, setFormIsValid]);


  const handleErrorMessage = (name: string, message: string) => {
    setErrorMessages(current => ({
      ...current,
      [name]: message,
    }))
  }

  function handleDefaultValidation(name: string, validationMessage: string) {
    const isValid = formRef.current?.checkValidity();

    handleErrorMessage(name, validationMessage)
    // оператор утверждения, что значение не равно null
    setFormIsValid(isValid!);
  }
  function nas(name: string, message: string) {
    handleErrorMessage(name, message)
  }
  function vas(name: validationConfigKeyProps, value: string) {
    handleCustomValidation(name, value)
  }

  // interface Iprops {
  //   name : validationConfigKeyProps | string;
  //   value: string;
  // }

  // interface lal {
  //   name: validationConfigKeyProps
  // }
  const handleCustomValidation = (name: validationConfigKeyProps, value: string) => {
    const { pattern, validationError, emptyError } = validationConfig[name];

    const match = pattern.test(value);
    const message = !value ? emptyError : match ? '' : validationError;
    // неправельный тип
    // const nameType: string = name as unknown as string;
    // handleErrorMessage(nameType, message);
    nas(name, message)
  }

  function handleSaveFormRef(evt: ChangeEvent<HTMLInputElement>) {
    // оператор логического нулевого присваивани, присваивает значение, только если x является нулевым
    formRef.current ??= evt.target.closest('form');
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
    const isError = Object.keys(errorMessages).some(name => errorMessages);

    setFormIsValid(() => isValid! && !isError);
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