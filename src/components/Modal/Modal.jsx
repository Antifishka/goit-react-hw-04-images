import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                console.log('Нажали ESC, нужно закрыть модалку');

                onClose();
            };
        };
        
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            };
    }, [onClose]);

    const handleBackdropClick = e => {
        console.log('Кликнули в бекдроп');

        if (e.currentTarget === e.target) {
            onClose();
        }
    }

    return createPortal( // рендерим разметку в другой корень id="modal-root"
        <div className={css.Overlay} onClick={handleBackdropClick}>
            <div className={css.Modal}>
            {children}
            </div>
        </div>,
        modalRoot,
    )
}

// export class OldModal extends Component{
//     componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown)
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.handleKeyDown)
//     }

//     handleKeyDown = e => {
//         if (e.code === 'Escape') {
//             console.log('Нажали ESC, нужно закрыть модалку');

//             this.props.onClose();
//         }
//     };

//     handleBackdropClick = e => {
//         console.log('Кликнули в бекдроп');

//         if (e.currentTarget === e.target) {
//             this.props.onClose();
//         }
//     }

//     render() {
//         return createPortal( // рендерим разметку в другой корень id="modal-root"
//         <div className={css.Overlay} onClick={this.handleBackdropClick}>
//             <div className={css.Modal}>
//             {this.props.children}
//             </div>
//         </div>,
//         modalRoot,
//     ) 
//     }
// }

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
}

