import { useEffect, useState } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import { MOVIES_REQUEST_ERROR_MESSAGE } from '../../utils/constants'
import { MovieType } from '../Types/MovieType';
import useMovieSearch from '../../hooks/useMoviesSearch';
import useSearchData from '../../hooks/useSearchData';
import useMoviesContext from '../../hooks/useMoviesContext';
import useResultCache from '../../hooks/useResultCache';
import { mainApi } from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList, { NewMoviesTyps } from '../MoviesCardList/MoviesCardList';

type HandleMoviesFetchType = {
  keyword?: string;
  shortmovies?: boolean;
}

function Movies() {
  const [moviesList, setMoviesList] = useState<MovieType[]>(() => {
    const movies = JSON.parse(localStorage.getItem('moviesList') as string);
    return movies ? movies : [];
  });
  const [renderMoviesList, setRenderMoviesList] = useState<MovieType[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { handleMoviesFilter } = useMovieSearch(setErrorMessage);
  const { keyword, handleStorageData } = useSearchData();
  const { addUserMovie, savedMoviesList, deleteUserMovie } = useMoviesContext();
  const { setResultCache, getResultCache } = useResultCache();


  // рендер результата поиска 
  const handleResultRender = (keyword: string , movies: MovieType[], shortmovies: boolean) => {
    const resultSearchMovie = handleMoviesFilter(keyword, movies, shortmovies);

    setRenderMoviesList(resultSearchMovie);
    setResultCache('moviesCache', { movies: resultSearchMovie });
  }
  // запросы к BeatfilmMoviesApi
  const handleMoviesFetch = ({ keyword , shortmovies} : HandleMoviesFetchType) => {
    setIsloading(true);

    moviesApi
      .getMoviesCards()
      .then(movies => {
        setMoviesList(movies);
        localStorage.setItem('moviesList', JSON.stringify(movies));
        return movies
      })
      .then((movies: MovieType[] )=> handleResultRender(String(keyword), movies, Boolean(shortmovies)))
      .catch((err) => {
        setErrorMessage(MOVIES_REQUEST_ERROR_MESSAGE);
        console.log(`Не удалось загрузить фильмы. Ошибка: ${err}`)
      })
      .finally(() => setIsloading(false));
  }

  const handleSubmitMoviesSearch = (value: { keyword: string; shortmovies: boolean}) => {
    handleStorageData(value);
    if (moviesList.length > 0) {
      handleResultRender(value.keyword, moviesList, value.shortmovies)
    } else {
      handleMoviesFetch(value)
    }
  }

  const handleCheckboxShortmovies = (shortmovies: boolean) => {
    handleStorageData({ shortmovies });
    if (keyword) {
      handleResultRender(keyword, moviesList, shortmovies)
    }
  }

  const handleMovieSave = (movie: NewMoviesTyps) => {
    return mainApi
      .addMovie(movie)
      .then(addUserMovie)
      .catch((err) => {
        console.log(`Не удалось сохранить фильм, Error: ${err}`);
      })
  }

  const handleMovieDelete = (movieId: string) => {
    return mainApi
      .deleteMovie(movieId)
      .then(() => deleteUserMovie(movieId))
      .catch(err => console.log(`Не удалось удалить фильм, Error: ${err}`))
  }
  // рендер данных из кэша
  useEffect(() => {
    if (moviesList.length > 0) {
      const movieCache = getResultCache('moviesCache');
      movieCache?.movies && setRenderMoviesList(movieCache.movies);
    }
    const errorCache = getResultCache('errors');
    errorCache?.error && setErrorMessage(errorCache.error);
  }, [getResultCache, moviesList.length])

  useEffect(() => {
    const keywordCache = getResultCache('searchValueCache')
    handleStorageData({ keyword: keywordCache?.keyword })
  }, [getResultCache, handleStorageData])

  useEffect(() => {
    errorMessage && setResultCache('errors', { error: errorMessage })
  }, [errorMessage, setResultCache]);
  return (
    <>
      <Header />
      <main>
        <SearchForm
          handleSubmitMoviesSearch={handleSubmitMoviesSearch}
          handleCheckboxShortmovies={handleCheckboxShortmovies}
          valueCache={true}
        />
        <MoviesCardList
          place='movies'
          moviesList={renderMoviesList}
          savedMoviesList={savedMoviesList}
          isLoading={isLoading}
          handleMovieSave={handleMovieSave}
          handleMovieDelete={handleMovieDelete}
          errorMessage={errorMessage}
        />
      </main>
      <Footer />
    </>
  )
}

export default Movies;