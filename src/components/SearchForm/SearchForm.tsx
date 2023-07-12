import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import useFormValid, { IObjectValues } from '../../hooks/useFormValid';
import { VALIDATION_INPUT_ERROR_MESSAGE } from '../../utils/constants';
import './SearchForm.css';
import SearchButton from '../UI/SearchButton/SearchButton';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useResultCache, { setResultCacheType } from '../../hooks/useResultCache';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';

type SearchFormProps  = {
  handleSubmitMoviesSearch: (value: {
    keyword: string;
    shortmovies: boolean;
  }) => void;
  handleCheckboxShortmovies: (shortmovies: boolean) => void;
  valueCache: boolean;
}

function SearchForm({ handleSubmitMoviesSearch, handleCheckboxShortmovies, valueCache = false }: SearchFormProps) {
  const [validationError, setValidationError] = useState('');
  const [visible, setVisible] = useState(false)
  const { 
    inputValues,
    handleInputChange,
    handleToggleChange,
    resetFormValues,
    checkboxValues
  } = useFormValid();
  const { setResultCache, getResultCache } = useResultCache();

  // type handleValuesCacheProps = {
  //   [index: string]: string | undefined | boolean
  // }
  // валидация ввода
  const handleValuesCache = (inputValues: setResultCacheType) => {
    if(valueCache) {
      setResultCache('searchValueCache', inputValues)
    }
  }
  // инпутов из кэша
  useEffect(() => {
    if(valueCache) {
      const cache = getResultCache('searchValueCache');
      cache && resetFormValues(cache);
    }
  }, [valueCache, getResultCache, resetFormValues])

  const handleInputValidate = () => {
    setValidationError('')
    const isValid = inputValues?.keyword && inputValues?.keyword.length > 0;

    if(!isValid) {
      setValidationError(VALIDATION_INPUT_ERROR_MESSAGE);
      setVisible(true)
    }
    return isValid;
  }

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isValid = handleInputValidate();
     if (isValid) {
      handleSubmitMoviesSearch({ 
        keyword: inputValues?.keyword as string, 
        shortmovies: checkboxValues?.shortmovies as boolean
      });
      handleValuesCache({ 
        keyword: inputValues?.keyword, 
        shortmovies: checkboxValues?.shortmovies
      })
      setVisible(false)
     }
  }

  // состояние чекбокса
  const handleCheckbox = (evt: ChangeEvent<HTMLInputElement>) => {
    handleToggleChange(evt);
    const { name, checked } = evt.target;
    handleCheckboxShortmovies(checked);
    handleValuesCache({ [name] : checked });
  }

  return ( 
    <section className='search-form'>
      {visible && <ErrorMessage text={validationError} place='search-form'/>}
      <form className='search-form__form' onSubmit={onSubmit} noValidate>
          <div className='search-form__input-container'>
            <input 
              value={inputValues?.keyword || ''} 
              onChange={handleInputChange} 
              className='search-form__input' 
              name='keyword' 
              type="text" 
              placeholder='Фильм' 
              required/>
            <SearchButton />
          </div>
          <FilterCheckbox
            handleChange={handleCheckbox} 
            checked={checkboxValues?.shortmovies}
          />
      </form>
    </section>
   );
}

export default SearchForm;