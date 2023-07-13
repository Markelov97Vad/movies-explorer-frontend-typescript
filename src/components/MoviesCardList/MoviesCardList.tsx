import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import AppendButton from "../UI/AppendButton/AppendButton";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import ButtonLike from "../UI/ButtonLike/ButtonLike";
import MoviesCard from "../MoviesCard/MoviesCard";
import { MovieType } from "../Types/MovieType";
import { handleMovieDataFormat } from "../../utils/config";
import useMoviesCardsRender from "../../hooks/useMoviesCardsRender";

export type NewMoviesTyps = {
  nameRU: string,
  nameEN: string,
  description: string,
  country: string,
  director: string,
  duration: number,
  year: string,
  trailerLink: string,
  image: string,
  thumbnail:  string,
  movieId?: number,
}

type MoviesCardListProps = {
  isLoading: boolean;
  place?: string;
  moviesList: MovieType[]
  savedMoviesList: MovieType[]
  handleMovieSave: (movieData: NewMoviesTyps) => void;
  handleMovieDelete: (id: string) => void;
  errorMessage: string;
}


function MoviesCardList({ isLoading, place, moviesList = [], handleMovieSave, savedMoviesList = [], handleMovieDelete, errorMessage }: MoviesCardListProps) {
  const { renderMovies, renderMoviesCard, renderButton } = useMoviesCardsRender(moviesList);
  return (
    <section className={`movies-card-list movies-card-list_place_${place}`}>
      {isLoading && <Preloader /> }
      {(!isLoading && renderMovies.length > 0) &&
        <>
          <ul className='movies-card-list__container'>
            {renderMovies.map((movie : MovieType) => {
              const movieData = handleMovieDataFormat(movie);
              const isOwner = savedMoviesList.some(savedMovie => savedMovie.movieId === movie.id);
              const handleSave = () => {
                handleMovieSave(movieData)
              }

              const handleDelete = () => {
                const movieId = savedMoviesList.find(elem => elem.nameRU === movieData.nameRU)
                handleMovieDelete(String(movieId?._id))
              }

              const handleClick = () => {
                if(!isOwner) {
                  handleSave();
                } else {
                  handleDelete();
                }
              }
            return (
              <li key={movie.id}>
                  <MoviesCard 
                    movie={movie}
                    handleClick={handleClick}
                    Button={ButtonLike}
                    // savedMoviesList={savedMoviesList}
                    isOwner={isOwner}
                  />
              </li>
            )
            })}
          </ul>
          {renderButton && <AppendButton onClick={renderMoviesCard} text='Ещё'/>}
        </>
      }
    {(moviesList.length === 0 && errorMessage ) && 
      <ErrorMessage text={errorMessage} place='movie-card-list'/>
    }
    </section>
  );
}

export default MoviesCardList;
