import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

function useMoviesContext() {
  const moviesContextValue = useContext(MoviesContext);
  return { ...moviesContextValue};
}

export default useMoviesContext;