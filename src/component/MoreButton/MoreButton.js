import React from "react";

function MoreButton(props) {

    return(<>
        {props.count < props.movies.filter((movie) => !props.short || movie.duration <= 40).length && 
        <button className="movies__button" onClick={props.addMovies}>Еще</button>}
        </>
    )
}

export default MoreButton