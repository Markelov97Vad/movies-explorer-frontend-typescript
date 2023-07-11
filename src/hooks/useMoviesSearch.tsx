import { MovieType } from "../components/Types/MovieType";
import { MOVIES_SEARCH_ERROR_MESSAGE, NUMBER_OF_SHORTMOVIES } from "../utils/constants";

// type MoviesSearchType = {
//   keyword?: string;
//   movies?: string;
//   shortmovies?: boolean;
// }

function useMovieSearch(handleError: (val: string) => void) {
  const checkError = (result: MovieType) => {
    if (result.length === 0) {
      handleError(MOVIES_SEARCH_ERROR_MESSAGE)
    }
  };

  const filterKeywords = ( keyword: string, movies: MovieType) => {
    const result = movies.filter( movie => {
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
    });
    checkError(result);
    return result
  }

  const filterShortMovies = (movies: MovieType) => {
    const result = movies.filter( movie => {
      return movie.duration <= NUMBER_OF_SHORTMOVIES
    });
    checkError(result);
    return result
  }

  const handleMoviesFilter = (keyword: string, movies: MovieType, shortmovies: boolean) => {
    let result = filterKeywords(keyword, movies);
    if(shortmovies) {
      result = filterShortMovies(result);
    }
    return result;
  }
  
  return { handleMoviesFilter };
}

export default useMovieSearch;