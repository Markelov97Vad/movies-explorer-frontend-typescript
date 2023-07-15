import { ConfigApiType } from "../components/Types/ConfigApiType";
import { MOVIES_API_URL } from "./constants";

// запросы к BeatfilmMoviesApi
class MoviesApi {
  private _url: string;
  private _headers: {
    'Content-Type': string
  }
  constructor({ url, headers }: ConfigApiType) {
    this._url = url;
    this._headers = headers; 
  }

  getMoviesCards() {
    return fetch(`${this._url}`, {
      headers: this._headers,
    })
    .then( res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
  }
}

const moviesApi = new MoviesApi({
  url: MOVIES_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
})


export default moviesApi