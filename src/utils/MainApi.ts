import { ConfigApiType } from "../components/Types/ConfigApiType";
import { MovieType } from "../components/Types/MovieType";
import { IObjectValues } from "../hooks/useFormValid";

export const MAIN_API_URL = 'http://localhost:3000';

// type RequestOptions = RequestInit & { json?: unknown; csrfToken?: string; prefixUrl?: string }


export type UserData = {
  name: string,
  email: string,
  password?: string
}

class MainApi {
  private _url: string;
  private _headers: {
    'Content-Type': string
  }

  constructor( props: ConfigApiType ) {
    this._url = props.url;
    this._headers = props.headers;
  }

  // _checkResponse(res: any) {
  //   if(res.ok) {
  //     return res.json()
  //   } else {
  //     return Promise.reject(res.status)
  //   }

  // register({ name, email, password } props: UserData) {
  register({ name , email, password } : IObjectValues): Promise<Response> {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, email, password})
    })
    // .then( res => this._checkResponse(res))
    .then( res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
    .catch(err => console.log(err))
  }

  authorize( {email, password}: IObjectValues): Promise<Response> {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    // .then(res => this._checkResponse(res));
    .then( res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
    .catch(err => console.log(err))
  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include'
    })
    .then( res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
    .catch(err => console.log(err))
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers
    })
    .then( res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
    .catch(err => console.log(err))
  }

  setUserInfo({name, email} : IObjectValues) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name , email})
    })
    .then( res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
    .catch(err => console.log(err))
  }

  getMoviesSavedByUser() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: 'include'
    })
    .then( res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
  }

  addMovie(movie: MovieType) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',  
      headers: this._headers,
      body: JSON.stringify({...movie})
    })
    .then( res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
    .catch(err => console.log(err))
  }

  deleteMovie(movieId: string) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
    .then( res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status)
      }
    })
    .catch(err => console.log(err))
  }
}

export const mainApi = new MainApi({
  url: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});