import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ children, onClick }) => {
    return <button className={css.Button} onClick={onClick}>{children}</button>
};

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
};