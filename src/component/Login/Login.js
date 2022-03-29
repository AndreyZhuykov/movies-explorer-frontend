import React from "react";
import { Link } from "react-router-dom";


function Login() {
    return (
        <div className="login">
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__form">
                <input className="login__input" placeholder="E-mail" required></input>
                <input className="login__input" placeholder="Пароль" required></input>
            </form>
            <button className="login__button">Войти</button>
            <p className="login__text">Ещё не зарегистрированы?<Link className="login__link" to="/signin">Регистрация</Link></p>
        </div>
    ) 
}

export default Login