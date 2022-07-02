import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

function SavedMovies({movies, short, count,handleSubmit,updateQuery,query, saveMovies,deleteMovie, updateShort}) {


    return (
        <section className="movies">
            <SearchForm
            handleSubmit={handleSubmit}
            updateQuery={updateQuery}
            query={query}
            />
            <FilterCheckbox
                short={short}
                updateShort={updateShort}
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