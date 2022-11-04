import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component{
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            console.log('Нажали ESC, нужно закрыть модалку');

            this.props.onClose();
        }
    };

    handleBackdropClick = e => {
        console.log('Кликнули в бекдроп');

        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal( // рендерим разметку в другой корень id="modal-root"
        <div className="Overlay" onClick={this.handleBackdropClick}>
            <div className="Modal">
            {this.props.children}
            </div>
        </div>,
        modalRoot,
    ) 
    }
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}

