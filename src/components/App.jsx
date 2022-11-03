import { Component } from "react";
import { ToastContainer } from "react-toastify";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component{
  state = {
    query:'',
  }

  handleFormSubmit = query => {
    console.log(query);

    this.setState({ query });
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
        <ToastContainer />
      </>
    );
  };
}
