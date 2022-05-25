import React from "react";

function SearchForm(props) {

    return(
            <form className="search-form" onSubmit={props.handleSubmit} >
                <div className="search-form__container">
                    <input 
                    className="search-form__search" 
                    type='search' 
                    placeholder="Фильм" 
                    value={props.query}
                    onChange={(e) => props.updateQuery(e.target.value)}
                    required/>
                    <button className="search-form__button" type="submit" >Найти</button>
                </div>
            </form>
    )
}

export default SearchForm