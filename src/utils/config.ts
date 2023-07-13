import { MovieType } from "../components/Types/MovieType";
import { MOVIES_BASE_API_URL } from "./constants";

export const iconsText: string[] = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

export const linksResources: {
  github: string;
  yandexPracticum: string;
} = {
  github: 'https://github.com/Markelov97Vad',
  yandexPracticum: 'https://practicum.yandex.ru/',
}

export const linksList: {
  id: number,
  text: string,
  link: string
}[]= [{
  id: 1,
  text: 'Статичный сайт',
  link: 'https://markelov97vad.github.io/how-to-learn/',
}, {
  id: 2,
  text: 'Адаптивный сайт',
  link: 'https://markelov97vad.github.io/russian-travel/'
}, {
  id: 3,
  text: 'Одностраничное приложение',
  link: 'https://mesto.marsello.nomoredomains.monster/'
}];

export const loadingMessage: {
  signup: string;
  signin: string;
  profile: string
} = { 
  signup: 'Регистрация..', 
  signin: 'Вход..' ,
  profile: 'Сохранение..'
};

// type handleMovieDataFormatProps = {
//   nameRU: string
//   nameEN: string
//   description: string
//   country: string
//   director: string
//   duration: number
//   year: number
//   trailerLink: string
//   image: string
//   thumbnail: string
//   movieId: number
// }

export function handleMovieDataFormat({ nameRU, nameEN, country, director, duration, year, image, id, description, trailerLink }: MovieType) {
  return {
      nameRU,
      nameEN,
      description,
      country,
      director,
      duration,
      year,
      trailerLink,
      image: String(MOVIES_BASE_API_URL + image.url),
      thumbnail:  String(MOVIES_BASE_API_URL + image.formats.thumbnail.url),
      movieId: id,
  };
}
