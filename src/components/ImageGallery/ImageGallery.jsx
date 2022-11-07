import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css'

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          previewImage={webformatURL}
          info={tags}
          largeImage={largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};