import React, { useRef } from 'react';
import { fetchSearchCoctail } from '../redux/slice/cocktail-slice';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import './SearchInput.css';

const SearchInput = () => {
  const searchRef = useRef();
  const dispatch = useDispatch();

  const handleChange = () => {
    const searchText = searchRef.current.value;
    dispatch(fetchSearchCoctail({ searchText }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Search Cocktail</label>
          <input
            type='text'
            name='name'
            id='name'
            ref={searchRef}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchInput;
