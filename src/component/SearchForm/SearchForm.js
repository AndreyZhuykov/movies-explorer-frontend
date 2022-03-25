import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return(
            <form className="search-form">
                <div className="search-form__container">
                    <input className="search-form__search" type='search' placeholder="Фильм"></input>
                    <button className="search-form__button" type="submit">Найти</button>
                </div>
                <FilterCheckbox/>
            </form>
    )
}

export default SearchForm