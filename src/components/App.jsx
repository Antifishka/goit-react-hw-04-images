import { Component } from "react";
import { GlobalStyle } from './GlobalStyle';
import { Container } from "./App.styled";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component{
  state = {
    query: '',
    page: 1,
  }

  handleFormSubmit = query => {
    console.log(query);

    this.setState({
      query,
      // images: [],
      page: 1,
    });
  }

  loadMore = ()=> {
    this.setState(prevState => ({
      page: prevState.page + 1,
      // images: [...prevState.images, images]
    }));
  };

  render() {
    return (
      <Container>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} page={this.state.page} onClickBtn={this.loadMore} />
        <ToastContainer autoClose={2500} theme="colored"/>
      </Container>
    );
  };
}
