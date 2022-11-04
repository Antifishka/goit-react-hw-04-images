import { Component } from "react";
import PropTypes from 'prop-types';
import { Modal } from "./Modal/Modal";

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
        const { showModal } = this.state;

        return (
            <>
                <li className="ImageGalleryItem">
                    <img className="ImageGalleryItem-image"
                        src={this.props.smallImage}
                        alt={this.props.infoImage}
                        onClick={this.toggleModal} />
                </li>

                {showModal && <Modal onClose={this.toggleModal}>
                    <img src={this.props.largeImage}
                        alt={this.props.infoImage} />
                </Modal>}
            </>    
        );
    };
}

ImageGalleryItem.propTypes = {
    smallImage: PropTypes.string.isRequired,
    infoImage: PropTypes.string.isRequired,
}
