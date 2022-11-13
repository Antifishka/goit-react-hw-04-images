import { useState } from "react";
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    if (query.trim() === '') {
      return toast.warn('Enter your query in the search bar!');
    };    

    onSubmit(query);
      setQuery('');
    };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <BiSearch size={24}/>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="query" 
          value={query}        
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}        
        />
      </form>
    </header>
  );
}  

Searchbar.propsType = {
  onSubmit: PropTypes.func.isRequired,
}