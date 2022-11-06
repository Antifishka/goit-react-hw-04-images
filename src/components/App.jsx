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
    loadBtnIsShown: false,
    status: STATUS.idle,
  }

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending', loadBtnIsShown: false });

      try {
        const fetchImages = await API.fetchImages(nextQuery, nextPage);
        console.log(fetchImages);

        this.setState(prevState => ({
          images: [...prevState.images, ...fetchImages.hits],
          status: STATUS.resolved,
          loadBtnIsShown: true,
        }))
      } catch (error) {
        console.log(error);
        this.setState({ status: STATUS.rejected });
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
    }));
  };

  render() {
    const { images, status, loadBtnIsShown } = this.state; 

    return (
      <div className={css.App}>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && (
          <p className={css.IgleText}>Please, enter your request</p>
        )}

        {status === 'pending' && <Loader />}
        
        {status === 'rejected' && <div>Sorry, there are no images matching your search query. Please try again.</div>}

        {status === 'resolved' && (
          <ImageGallery images={images} />
        )}  

        {loadBtnIsShown && (
          <Button onClick={this.onLoadMoreBtnClick}>Load More</Button>
        )}

        <ToastContainer autoClose={2500} theme="colored"/>
      </div>
    );
  };
}
