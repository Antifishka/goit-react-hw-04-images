import { Component } from "react";
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
      query: '',
    }

    handleQueryChange = e => {
        this.setState({ query: e.currentTarget.value.toLowerCase() });
    };

    handleSubmit = e => {
        e.preventDefault();
    
        if (this.state.query.trim() === '') {
            return toast.warn('Enter your query in the search bar!');
        };    

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    };

    render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <BiSearch size={24}/>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="query" 
            value={this.state.query}        
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}        
          />
        </form>
      </header>
    );
    };
};