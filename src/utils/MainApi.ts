export const MAIN_API_URL = 'http://localhost:3000';

interface IConfigApi {
  url: string,
  headers: {
    'Content-Type': string
  }
}

type RequestOptions = RequestInit & { json?: unknown; csrfToken?: string; prefixUrl?: string }


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

  constructor( props: IConfigApi ) {
    this._url = props.url;
    this._headers = props.headers;
  }

  // _checkResponse(res: ) {
  //   if(res.ok) {
  //     return res.json()
  //   } else {
  //     return Promise.reject(res.status)
  //   }

  // register({ name, email, password } props: UserData) {
  register({ name , email, password }: UserData): Promise<Response> {
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

  authorize( {email, password}: UserData): Promise<Response> {
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
}

export const mainApi = new MainApi({
  url: MAIN_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});