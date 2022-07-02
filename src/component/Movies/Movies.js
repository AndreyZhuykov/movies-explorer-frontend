import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoreButton from "../MoreButton/MoreButton";
import EmptyMovie from "../EmptyMovie/EmptyMovie";

function Movies({
    movies,
    handleSubmit,
    query,
    short,
    updateShort,
    updateQuery,
    count,
    addMovies,
    saveMovie,
    saveMovies,
    deleteMovie,
    }) 

{   
    const emptyMovie = movies.length === 0

    return (
        <section className="movies">
            <SearchForm 
            handleSubmit={handleSubmit}
            query={query}
            updateQuery={updateQuery}
            /> 
            <FilterCheckbox
                short={short}
                updateShort={updateShort}
            />
            {emptyMovie? <EmptyMovie/> : 
                <MoviesCardList 
                movies={movies}
                short={short}
                count={count}     
                saveMovie={saveMovie}      
                saveMovies={saveMovies}
                deleteMovie={deleteMovie}
                />
            }
            <MoreButton
                movies={movies}
                count={count}
                short={short}
                addMovies={addMovies}
            />    
        </section>
    ) 
}

export default Movies