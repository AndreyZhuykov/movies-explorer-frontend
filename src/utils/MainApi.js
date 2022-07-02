export default class Api {
    constructor({address, headers}) {
      this._address = address;
      this._headers = headers;
    } 

    _url(query) {
      return `${this._address}/${query}`
    }

    _get(query) {
        const jwt = localStorage.getItem("jwt");
        const option = {
            headers: {
                authorization: `Bearer ${jwt}`,
                ...this._headers, 
                credentials:'include'
            }
        }
        return fetch(this._url(query), option).then(this._checkResponse)
    }
  
    _set(query, method, body) {
        const jwt = localStorage.getItem("jwt");
        const option = {
            method,
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
                ...this._headers 
            },
            body: JSON.stringify(body)
        }
        return fetch(this._url(query), option).then(this._checkResponse)
    }

    _checkResponse(res) {
      if (res.ok){
          return res.json();}
      return Promise.reject(console.log(`Ошибка: ${res.status}`))
    }

    _getSaveMovies() {
      return this._get('movies');
    }

    _getUserInfo() {
      return this._get('users/me');
    }

    getAppInfo() {
      return Promise.all([this._getUserInfo(), this._getSaveMovies()])
    }

    saveMovie(data){
      return  this._set('movies','POST', 
      {
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        movieId: data.movieId,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      }
      );
    }

    deleteMovie(data) {
      return  this._set(`movies/${data._id}`,'DELETE')
    }
    

    register = (name, email, password) => {
      return fetch(`${this._address}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })    
      })
      .then(res => res.status === 201 ? res.json() : res);
    }
    
    authorize = (email, password) => {
      return fetch(`${this._address}/signin`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email,
              password
          })
      })
      .then(res => res.json())
      .then(data => {
          return data;
      });
    }

    updateUser = (name, email) => {
      const jwt = localStorage.getItem("jwt");
      return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${jwt}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email
        })
      })
      .then(res => res.json())
      .then(data => {
          return data;
      });
    }
    
    checkToken = jwt => {
      return fetch(`${this._address}/users/me`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
          }
      })
      .then(res => res.status === 200 ? res.json() : res);
  };
}

const mainApi = new Api({
    address: 'https://api.movie.nomoredomains.work',
    headers: {
        'Content-Type': 'application/json'
      }

});

export {mainApi}; 