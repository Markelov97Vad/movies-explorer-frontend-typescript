import { useEffect, useState } from 'react';
import { MOVIES_SEARCH_ERROR_MESSAGE, UNDEFINED_SAVED_MOVIES_MESSAGE } from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import useMovieSearch from '../../hooks/useMoviesSearch';
import useSearchData from '../../hooks/useSearchData';
import useMoviesContext from '../../hooks/useMoviesContext';
import { MovieType } from '../Types/MovieType';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

function SavedMovies() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [renderMoviesList, setRenderMoviesList] = useState<MovieType[]>([]);
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const { savedMoviesList, deleteUserMovie } = useMoviesContext();
  const { handleMoviesFilter } = useMovieSearch(setErrorMessage);
  const { keyword, handleStorageData } = useSearchData();

  const handleResultRender = (keyword: string, movies: MovieType[], shortmovies: boolean) => {
    const resultSearchMovie = handleMoviesFilter(keyword, movies, shortmovies);

    setRenderMoviesList(resultSearchMovie);
  };

  const handleSubmitMoviesSearch = (value: { keyword: string; shortmovies: boolean}) => {
    handleStorageData(value);
    
    if(savedMoviesList.length > 0) {
      handleResultRender(value.keyword, savedMoviesList, value.shortmovies)
    }
  }

  const handleCheckboxShortmovies = (shortmovies: boolean) => {
    handleStorageData({ shortmovies })
    if(savedMoviesList.length > 0) {
      handleResultRender(keyword, savedMoviesList, shortmovies)
    }
  }

  const handleMovieDelete = (movieId: string) => {
    return mainApi
      .deleteMovie(movieId)
      .then(() => {
        deleteUserMovie(movieId)
      })
      .then(() => {
        setRenderMoviesList( savedMovies => {
          return savedMovies.filter(movie => movie._id !== movieId)
        })
      })
      .catch(err => console.log(`Не удалось удалить фильм, Error: ${err}`))
  }

  useEffect(() => {
    if(initialRender && savedMoviesList.length > 0) {
      setRenderMoviesList(savedMoviesList);
      setErrorMessage(MOVIES_SEARCH_ERROR_MESSAGE)
      setInitialRender(false);
    } else if (savedMoviesList.length === 0) {
      setErrorMessage(UNDEFINED_SAVED_MOVIES_MESSAGE)
    }
  }, [initialRender, savedMoviesList]);


  return ( 
    <>
      <Header />
      <main>
        <SearchForm 
          handleSubmitMoviesSearch={handleSubmitMoviesSearch} 
          handleCheckboxShortmovies={handleCheckboxShortmovies}
        />
        <SavedMoviesCardList
          place='saved-movies' 
          moviesList={renderMoviesList} 
          handleMovieDelete={handleMovieDelete}
          errorMessage={errorMessage}
        />
      </main>
      <Footer />
    </> 
  );
}

export default SavedMovies;