import { Component } from "react";
import PropTypes from 'prop-types';
import { Modal } from "../Modal/Modal";
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component{
    state = {
        showModal: false,
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };

    render() {
        const { previewImage, largeImage, info } = this.props;
        const { showModal } = this.state;

        return (
            <>
                <li className={css.ImageGalleryItem}>
                    <img className={css.ImageGalleryItemImage}
                        src={previewImage}
                        alt={info}
                        onClick={this.toggleModal} />
                </li>

                {showModal && <Modal onClose={this.toggleModal}>
                    <img src={largeImage}
                        alt={info} />
                </Modal>}
            </>    
        );
    };
}

ImageGalleryItem.propTypes = {
  previewImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};
