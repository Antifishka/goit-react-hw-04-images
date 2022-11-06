import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.spinner}>
    <ThreeDots 
          height="80" 
          width="80" 
          adius="9"
          color="#3f51b5" 
          ariaLabel="three-dots-loading"
          wrapperClassName="Loader"
          visible={true}
    />
  </div>
);