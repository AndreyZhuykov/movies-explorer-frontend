import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList(props) {

    return(
            <div className="movies-card-list">
                {props.movies
                .filter((movie) => !props.short || movie.duration <= 40)
                .slice(0, props.count)
                .map((movie) => {
                    return <MoviesCard
                        key={movie.id || movie.movieId}
                        movie={movie}
                        saveMovie={props.saveMovie}
                        saveMovies={props.saveMovies}
                        deleteMovie={props.deleteMovie}
                    />
                })
                }
            </div>
    )
}

export default MoviesCardList