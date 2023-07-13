import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { ComponentType } from 'react';
import { MovieType } from '../Types/MovieType';
import { MOVIES_BASE_API_URL } from '../../utils/constants';

type ButtonProps = {
  handleClick?: () => void;
  handleMenuOpen?: () => void
  isOwner?: boolean;
  place?: string;
}

type MoviesCardProps = {
  movie: MovieType;
  handleClick: () => void;
  Button: ComponentType<ButtonProps>;
  isOwner?: boolean;
  place?: string;
  handleMovieDelete?: (id: string) => void
}

function MoviesCard({ movie, handleClick, Button, isOwner, place}: MoviesCardProps) {
  const { pathname } = useLocation();
  const { image, nameRU, duration, trailerLink } = movie;
  const imageUrlForMovies = MOVIES_BASE_API_URL + image.url;
  // const imageUrlForSavedMovies = image;
  // console.log('imageUrlForMovies',imageUrlForMovies);
  // console.log('imageUrlForSavedMovies', imageUrlForSavedMovies);
  
  
  const getTimeFromMinutes = ((time: number) => {
    const minutes = time % 60;
    const hour = Math.floor(time / 60);

    return `${hour}ч ${minutes}м`;
  })

  return ( 
    <article className='movies-card'>
      <a className='movies-card__link' href={trailerLink} target='_blank' rel="noreferrer">
        {/* <img className='movies-card__image' src={pathname === '/movies' ? String(imageUrlForMovies) : String(imageUrlForSavedMovies)} alt={nameRU} /> */}
        <img className='movies-card__image' src={String(imageUrlForMovies)} alt={nameRU} />
      </a>
      <div className='movies-card__info'>
        <div className='movies-card__wrapper'>
          <h2 className='movies-card__title'>{nameRU}</h2>
          <Button handleClick={handleClick} isOwner={isOwner} place={place}/>
        </div>
        <span className='movies-card__time-code'>{getTimeFromMinutes(duration)}</span>
      </div>
    </article>
  );
}

export default MoviesCard;