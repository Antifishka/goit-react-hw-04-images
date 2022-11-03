import { Component } from "react";
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi'

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
            return toast('Enter your query in the search bar');
        };    

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    };

    render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BiSearch className="SearchForm-button-icon" size={24}/>
          </button>

          <input
            className="SearchForm-input"
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