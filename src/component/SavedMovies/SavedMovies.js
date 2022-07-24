import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import EmptyMovie from "../EmptyMovie/EmptyMovie";

function SavedMovies({movies, short, count,handleSubmit,updateQuery,query, saveMovies,deleteMovie, updateShort,movieNotFound}) {

    const emptyMovies = movies.length === 0

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
            {movieNotFound ? <EmptyMovie/> : <MoviesCardList
                movies={emptyMovies? saveMovies : movies}
                short={short}
                count={count}
                saveMovies={saveMovies}
                deleteMovie={deleteMovie}
            />} 
            
         
            
            
        </section>
    )
}

export default SavedMovies