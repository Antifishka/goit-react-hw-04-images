import { Component } from "react";
import { ThreeDots } from 'react-loader-spinner';
// import axios from "axios";
import API from '../../helpers/images-api'
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Button } from "./Button/Button";
import { IgleGallery } from "./ImageGallery.styled";

export class ImageGallery extends Component {
    state = {
        images: [],
        error: null,
        status: 'igle',
    };

    async componentDidUpdate(prevProps, _) {
        try {
            const prevQuery = prevProps.query;
            const nextQuery = this.props.query;
            const prevPage = prevProps.page;
            const nextPage = this.props.page;

            if (prevQuery !== nextQuery ||
                prevPage !== nextPage) {
                this.setState({ status: 'pending' });

                const fetchImages = await API.fetchImages(nextQuery, nextPage);
                console.log(fetchImages);

                this.setState(state => ({
                    images: [...state.images, fetchImages],
                    status: 'resolved',
                }))
            }
        } catch (error) {
            console.log(error);
            this.setState({ status: 'rejected' });
        }
    }
    
    render() {
        const { images, status } = this.state;
        console.log({ images });

        if (status === 'igle') {
            return <IgleGallery>Enter your query in the search bar</IgleGallery>
        }

        if (status === 'pending') {
            return <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#3f51b5" 
                ariaLabel="three-dots-loading"
                wrapperClassName="Loader"
                visible={true}
                />
        };

        if (status === 'rejected') {
            return <div>Sorry, there are no images matching your search query. Please try again.</div>
        }

        if (status === 'resolved') {
            return (
                <>
                    <ul className="ImageGallery">
                        {images.map(image =>
                            <ImageGalleryItem
                                key={image.id}
                                smallImage={image.webformatURL}
                                largeImage={image.largeImageURL}
                                infoImage={image.tags} />
                        )}
                    </ul>
                
                    <Button onClick={this.props.onClickBtn}>Load more</Button>
                </>    
            );
        };
    };
}