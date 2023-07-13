import MoviesCard from "../MoviesCard/MoviesCard";
import { MovieType } from "../Types/MovieType";
import ButtonCross from "../UI/ButtonCross/ButtonCross";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";

type SavedMoviesCardListProps = {
  place?: string;
  moviesList: MovieType[] ;
  errorMessage: string;
  handleMovieDelete: (id: string) => void;
}

function SavedMoviesCardList({ place, moviesList = [], errorMessage, handleMovieDelete }: SavedMoviesCardListProps) {
  return ( 
    <section className={`movies-card-list movies-card-list_place_${place}`}>
      {moviesList.length > 0 && 
      <ul className='movies-card-list__container'>
          {moviesList.map((movie) => {
            const handleDelete = () => {
              handleMovieDelete(String(movie?._id))
            }

            const handleClick = () => {
              handleDelete();
            }
          return (
            <li key={movie._id}>
                <MoviesCard 
                  movie={movie} 
                  Button={ButtonCross}
                  handleClick={handleClick}
                  handleMovieDelete={handleMovieDelete}
                  place='card'
                />
            </li>
          )
        })}
      </ul>
    }
    {(moviesList.length === 0 && errorMessage) && 
      <ErrorMessage text={errorMessage} place='movie-card-list'/>
    }
    </section>
   );
}

export default SavedMoviesCardList;