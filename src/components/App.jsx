import { Component } from "react";
import { GlobalStyle } from './GlobalStyle';
import API from '../helpers/images-api'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import css from './App.module.css';
import { toast } from 'react-toastify';

const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class App extends Component{
  state = {
    page: 1,
    query: '',
    images: [],
    error: null,
    showLoadBtn: false,
    status: STATUS.idle,
  }

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending', showLoadBtn: false });

      try {
        const fetchImages = await API.fetchImages(nextQuery, nextPage);
        console.log(fetchImages);

        this.setState(prevState => ({
          images: [...prevState.images, ...fetchImages.hits],
          status: 'resolved',
          showLoadBtn: true,
        }))

        const totalPages = this.calculateTotalPages(fetchImages);
        console.log(nextPage);
        console.log(totalPages);
        if (nextPage > totalPages) {
          this.setState({ showLoadBtn: false });
          return toast.warn("We're sorry, but you've reached the end of search results.");
        }

      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  };
  
  handleFormSubmit = query => {
    console.log(query);

    this.setState({
      query,
      images: [],
      page: 1,
    });
  }

  onLoadMoreBtnClick = (e)=> {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  calculateTotalPages = (fetchImages) => {
    const totalHits = fetchImages.totalHits;
    return Math.ceil(totalHits / 12);
  }
    
  render() {
    const { images, status, error, showLoadBtn } = this.state; 

    return (
      <div className={css.App}>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && (
          <p className={css.MessageText}>Please, enter your request</p>
        )}

        {status === 'pending' && (
          <>
            <Loader />

            {showLoadBtn && (
                <Button onClick={this.onLoadMoreBtnClick}>Load More</Button>)}
          </>  
        )}
        
        {status === 'rejected' && <div className={css.MessageText}>{error.message}</div>}

        {(status === 'pending' || status === 'resolved') && (
          <>
            <ImageGallery images={images} />
            
            {showLoadBtn && (
              <Button onClick={this.onLoadMoreBtnClick}>Load More</Button>)}
          </>  
        )}

        <ToastContainer autoClose={2500} theme="colored"/>
      </div>
    );
  };
}
