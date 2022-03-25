import React from "react";
import { Link } from "react-router-dom";

function Navigation(props) {


    return(
            <div  className={`navigation  ${props.isOpen ? `navigation_active`: ""}`}>
                <button className='navigation__exit' type="button" onClick={props.onClose}>×</button>
                <Link className='navigation__link navigation__link_main' to="/">Главная</Link>
                <Link className='navigation__link' to="/movies">Фильмы</Link>
                <Link className='navigation__link' to="/saved-movies">Сохранённые фильмы</Link>
                <Link className='navigation__button' to="/profile">Аккаунт</Link>
            </div>
    )
}

export default Navigation