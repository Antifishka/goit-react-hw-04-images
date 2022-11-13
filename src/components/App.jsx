import { useState, useEffect } from "react";
import { GlobalStyle } from './GlobalStyle';
import API from '../helpers/images-api'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import css from './App.module.css';
import { toast } from 'react-toastify';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function ImageFinder() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [showLoadBtn, setShowLoadBtn] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!query) {
      //Первый рендер, query это пустая строка, не делаем fetch 
      return;
    }

    setStatus(Status.PENDING);
    setShowLoadBtn(false);

    searchImages();

    async function searchImages() {
      try {
      const fetchImages = await API.fetchImages(query, page);
      console.log(fetchImages);
      //Порядок важен! Сначала кладем данные, потом статус.
      setImages(prevImages => [...prevImages, ...fetchImages.hits]);
      setStatus(Status.RESOLVED);
      setShowLoadBtn(true);

      const totalPages = calculateTotalPages(fetchImages);
      console.log(`Текущая страница`, page);
      console.log(`Общее кол-во страниц`, totalPages);

      if ((page > totalPages) || (page === totalPages)) {
        setShowLoadBtn(false);
        return toast.warn("We're sorry, but you've reached the end of search results.");
      }

      } catch (error) {
      setError(error);
      setStatus(Status.REJECTED);
      };
    };
  }, [query, page]);

  const handleFormSubmit = query => {
    console.log(query);

    setQuery(query);
    setImages([]);
    setPage(1);
  }

  const onLoadMoreBtnClick = (e) => {
    setPage(prevPage => prevPage + 1);
    setStatus('pending');
  };

  const calculateTotalPages = fetchImages => {
    const totalHits = fetchImages.totalHits;
    return Math.ceil(totalHits / 12);
  }

  return (
    <div className={css.App}>
      <GlobalStyle />
      <Searchbar onSubmit={handleFormSubmit} />

      {status === Status.IDLE && (
        <p className={css.MessageText}>Please, enter your request</p>
      )}

      {status === Status.PENDING && <Loader />}
        
      {status === Status.REJECTED && <div className={css.MessageText}>{error.message}</div>}

      {(status === Status.PENDING || status === Status.RESOLVED) && (
        <>
          <ImageGallery images={images} />

          {page !==1 && !showLoadBtn && <Loader />}
            
          {showLoadBtn && (
            <Button onClick={onLoadMoreBtnClick}>Load More</Button>)}
        </>  
      )}

      <ToastContainer autoClose={2500} theme="colored"/>
    </div>
  );
}

// export class OldApp extends Component{
//   state = {
//     page: 1,
//     query: '',
//     images: [],
//     error: null,
//     showLoadBtn: false,
//     status: STATUS.idle,
//   }

//   async componentDidUpdate(_, prevState) {
//     const prevQuery = prevState.query;
//     const nextQuery = this.state.query;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevQuery !== nextQuery || prevPage !== nextPage) {
//       this.setState({ status: 'pending', showLoadBtn: false });

//       try {
//         const fetchImages = await API.fetchImages(nextQuery, nextPage);
//         console.log(fetchImages);

//         this.setState(prevState => ({
//           images: [...prevState.images, ...fetchImages.hits],
//           status: 'resolved',
//           showLoadBtn: true,
//         }))

//         const totalPages = this.calculateTotalPages(fetchImages);
//         console.log(`Текущая страница`, nextPage);
//         console.log(`Общее кол-во страниц`, totalPages);
//         if ((nextPage > totalPages) || (nextPage === totalPages)) {
//           this.setState({ showLoadBtn: false });
//           return toast.warn("We're sorry, but you've reached the end of search results.");
//         }

//       } catch (error) {
//         this.setState({ error, status: 'rejected' });
//       }
//     }
//   };
  
//   handleFormSubmit = query => {
//     console.log(query);

//     this.setState({
//       query,
//       images: [],
//       page: 1,
//     });
//   }

//   onLoadMoreBtnClick = (e)=> {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//       status: 'pending',
//     }));
//   };

//   calculateTotalPages = (fetchImages) => {
//     const totalHits = fetchImages.totalHits;
//     return Math.ceil(totalHits / 12);
//   }
    
//   render() {
//     const { images, status, error, showLoadBtn } = this.state; 

//     return (
//       <div className={css.App}>
//         <GlobalStyle />
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {status === 'idle' && (
//           <p className={css.MessageText}>Please, enter your request</p>
//         )}

//         {status === 'pending' && (
//           <>
//             <Loader />

//             {showLoadBtn && (
//                 <Button onClick={this.onLoadMoreBtnClick}>Load More</Button>)}
//           </>  
//         )}
        
//         {status === 'rejected' && <div className={css.MessageText}>{error.message}</div>}

//         {(status === 'pending' || status === 'resolved') && (
//           <>
//             <ImageGallery images={images} />
            
//             {showLoadBtn && (
//               <Button onClick={this.onLoadMoreBtnClick}>Load More</Button>)}
//           </>  
//         )}

//         <ToastContainer autoClose={2500} theme="colored"/>
//       </div>
//     );
//   };
// }
