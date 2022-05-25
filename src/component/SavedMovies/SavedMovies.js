import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({movies, short, count,handleSubmit,updateQuery,query, saveMovies,deleteMovie}) {


    return (
        <section className="movies">
            <SearchForm
            handleSubmit={handleSubmit}
            updateQuery={updateQuery}
            query={query}
            />
            <MoviesCardList
                movies={movies}
                short={short}
                count={count}
                saveMovies={saveMovies}
                deleteMovie={deleteMovie}
            />
        </section>
    )
}

export default SavedMovies