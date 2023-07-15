import { useEffect, useState } from "react";
import { MoviesContext } from "./MoviesContext";
import { mainApi } from "../utils/MainApi";
import { MovieType } from "../components/Types/MovieType";
import { ChildrenPropsType } from "../components/Types/props.types";

function MoviesContextProvider({ children }: ChildrenPropsType) {
  const [savedMoviesList, setSavedMoviesList] = useState<MovieType[]>([] as MovieType[]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('savedMovies') as string);

    if(movies) {
      setSavedMoviesList(movies);
    } else {
      mainApi
        .getMoviesSavedByUser()
        .then(movies => {
          setSavedMoviesList(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        })
        .catch((err) => {
          console.log(`Не удалось загрузить фильмы пользователя. Ошибка: ${err}`)
        })
    }
  },[]);

  const addUserMovie = (movie: MovieType) => {
    const newSavedMoviesList = [...savedMoviesList, movie ];
    setSavedMoviesList(newSavedMoviesList as MovieType[]);
    localStorage.setItem('savedMovies', JSON.stringify(newSavedMoviesList));
  }

  const deleteUserMovie = (movieId: string) => {
    const newSavedMoviesList = savedMoviesList?.filter(elem => elem._id !== movieId);
    setSavedMoviesList(newSavedMoviesList);
    localStorage.setItem('savedMovies', JSON.stringify(newSavedMoviesList));
  }

  return ( 
    <MoviesContext.Provider value={{ 
        savedMoviesList,
        addUserMovie, 
        deleteUserMovie 
      }}>
      {children}
    </MoviesContext.Provider> );
}

export default MoviesContextProvider;