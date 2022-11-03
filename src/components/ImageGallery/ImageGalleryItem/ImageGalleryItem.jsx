import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ smallImage, infoImage}) => {
    return <li className="ImageGalleryItem">
        <img className="ImageGalleryItem-image"
            src={smallImage}
            alt={infoImage} />
        </li>
};

ImageGalleryItem.propTypes = {
    smallImage: PropTypes.string.isRequired,
    infoImage: PropTypes.string.isRequired,
}

// toggleModal = () => {
//         this.setState(({ showModal }) => ({
//             showModal: !showModal,
//         }));
//     };