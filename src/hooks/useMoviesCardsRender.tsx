import { useEffect, useState } from "react";
import { NewMoviesTyps } from "../components/MoviesCardList/MoviesCardList";
import useResize from "./useResize";
import { MovieType } from "../components/Types/MovieType";

function useMoviesCardsRender(moviesList: MovieType[]) {
  const [renderMovies, setRenderMovies] = useState<MovieType[]>([]);
  const [renderButton, setRenderButton] = useState<boolean>(false);
  const { cardsCount, newCardsCount } = useResize();

  useEffect(() => {
    setRenderMovies(moviesList.slice(0, cardsCount));
  },[moviesList, cardsCount]);

  useEffect(() => {
    setRenderButton(() => moviesList.length > renderMovies.length)
  }, [moviesList, renderMovies]);

  const renderMoviesCard = () => {
    setRenderMovies(movies => [
      ...movies,
      ...moviesList.slice(movies.length, movies.length + newCardsCount)
    ])
  }
  return {renderButton, renderMovies, renderMoviesCard };
}

export default useMoviesCardsRender;