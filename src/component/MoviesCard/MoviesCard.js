import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
    const [urlState, setUrlState] = React.useState(false)
    
    const url = useLocation();

    const isMovieSave = props.saveMovies.some(
        (m) => { 
            return m.movieId === props.movie.id
        }
    );

    const userSaveMovie = Object.values(props.saveMovies).filter(
        (m) => {
            return m.movieId === props.movie.id
        }
    )[0];

    const cardLikeButtonClassName = (
        `movies-card__button ${isMovieSave ? 'movies-card__button_active' : ' '}`
    );
 
    const addres = 'https://api.nomoreparties.co'
    const img = props.movie.image.url

    function handleSaveMovie(e) {
        e.preventDefault();
        const movie = {
            country: props.movie.country,
            director: props.movie.director,
            duration: props.movie.duration,
            year: props.movie.year,
            description: props.movie.description,
            image: addres + img,
            trailerLink: props.movie.trailerLink,
            nameRU: props.movie.nameRU,
            nameEN: props.movie.nameEN,
            thumbnail:  addres + img,
            movieId: props.movie.id,
        };
        if(movie.country === ""){
            movie.country = "unknown";
        }
        if(movie.nameEN === ""){
            movie.nameEN = movie.nameRU;
        }
        if(movie.country === null){
            movie.country = "unknown";
        }
        props.saveMovie(movie);
    } 

    function handleDeleteMovie(e) {
        props.deleteMovie(props.movie);
    }

    function handleDeleteSaveMovie(e) {
        props.deleteMovie(userSaveMovie);
    }

    React.useEffect(() => {
        if(url.pathname === '/movies') {
            setUrlState(true)
        } 
    }, [url.pathname])
    
    return(
    <>
        <article className="movies-card">
            {urlState ? <button className={cardLikeButtonClassName} onClick={isMovieSave ? handleDeleteSaveMovie : handleSaveMovie}/> : <button className='movies-card__delete' onClick={handleDeleteMovie}/>}
            <h3 className="movies-card__title">{props.movie.nameRU}</h3>
            <time className="movies-card__time">{props.movie.duration}м</time>   
            <a href={props.movie.trailerLink} target='_blank' rel="noreferrer">           
            {urlState ? <img className="movies-card__img" alt="Кадр из фильма" src={addres + img} /> : <img className="movies-card__img" alt="Кадр из фильма" src={props.movie.image} />} 
            </a> 
        </article>
    </>
    )
}

export default MoviesCard