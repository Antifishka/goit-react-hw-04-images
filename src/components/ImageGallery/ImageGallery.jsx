import { Component } from "react";
import { ThreeDots } from 'react-loader-spinner';
// import axios from "axios";
import API from '../../helpers/images-api'
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import {Button} from "./Button/Button";

export class ImageGallery extends Component {
    state = {
        images: [],
        error: null,
        status: 'igle',
    };

    componentDidUpdate(prevProps, _) {
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query;
        const prevPage = prevProps.page;
        const nextPage = this.props.page;

        if (prevQuery !== nextQuery ||
            prevPage !== nextPage) {
            this.setState({ status: 'pending' });

            API
                .fetchImages(nextQuery)
                .then(fetchImages => this.setState({ images: fetchImages.hits, status: 'resolved' }))
                .catch(error => this.setState({ error, status: 'rejected' }));
        }
    }

    render() {
        const { images, status } = this.state;
        console.log({ images });

        if (status === 'igle') {
            return <div>Введите запрос</div>
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