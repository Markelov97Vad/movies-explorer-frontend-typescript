export type MovieType = {
  _id?: string;
  country: string;
  created_at?: string;
  description : string
  director: string;
  duration: number;
  id?: number;
  image: {
    url: string;
    formats: {
      thumbnail: {
        url: string
      }
    }
  };
  nameEN: string;
  nameRU: string;
  trailerLink: string;
  updated_at?: string;
  year: string;
  movieId?: number;
}
