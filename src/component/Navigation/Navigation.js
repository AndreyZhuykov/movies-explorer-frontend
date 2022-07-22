import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(props) {


    return(
            <div  className={`navigation  ${props.isOpen ? `navigation_active`: ""}`}>
                <button className='navigation__exit' type="button" onClick={props.onClose}>×</button>
                <NavLink className='navigation__link navigation__link_main' to="/">Главная</NavLink>
                <NavLink className='navigation__link' to="/movies">Фильмы</NavLink>
                <NavLink className='navigation__link' to="/saved-movies">Сохранённые фильмы</NavLink>
                <NavLink className='navigation__button' to="/profile">Аккаунт</NavLink>
            </div>
    )
}

export default Navigation