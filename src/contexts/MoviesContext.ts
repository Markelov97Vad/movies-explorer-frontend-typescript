import { createContext } from "react";
import { MovieType } from "../components/Types/MovieType";

interface IMoviesContext {
  addUserMovie: (movie: MovieType) => void;
  savedMoviesList: MovieType[];
  deleteUserMovie:(movieId: string) => void;

}

export const MoviesContext = createContext({} as IMoviesContext);