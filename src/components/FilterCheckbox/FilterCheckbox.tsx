import { ChangeEvent } from 'react';
import './FilterCheckbox.css';

type FilterCheckboxProps = {
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean | null;
}

function FilterCheckbox({ handleChange, checked }: FilterCheckboxProps) {
  return ( 
    <div className='filter-checkbox filter-checkbox_size_l filter-checkbox_size_s'>
      <input 
        className='filter-checkbox__input' 
        type='checkbox' 
        id='shortmovies'
        onChange={handleChange} 
        title='Короткометражки'
        name='shortmovies'
        checked={checked || '' as unknown as undefined}
      />
      <label className='filter-checkbox__label' htmlFor='shortmovies'></label>
      <span className='filter-checkbox__text'>Короткометражки</span>
    </div>
   );
}

export default FilterCheckbox;