import { useState } from "react";
import PropTypes from 'prop-types';
import { Modal } from "../Modal/Modal";
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ previewImage, largeImage, info }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

    return (
        <>
            <li className={css.ImageGalleryItem}>
                <img className={css.ImageGalleryItemImage}
                    src={previewImage}
                    alt={info}
                     onClick={toggleModal} />
            </li>

            {showModal && <Modal onClose={toggleModal}>
                <img src={largeImage}
                    alt={info} />
            </Modal>}
        </>    
    );
}

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};
