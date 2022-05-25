function moviesApi () {
    return fetch('https://api.nomoreparties.co/beatfilm-movies')
    .then((res) => {
    return res.json()
    })
    .then((data) => {
    return data;
    })
    .catch((err) => {
    console.log('Ошибка. Запрос не выполнен');
    });    
}


export default moviesApi;