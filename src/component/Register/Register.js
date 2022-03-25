import React from "react";
import { Link } from "react-router-dom";


function Register() {
    return(
        <div className="register">
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form">
                <input className="register__input" type='name' placeholder="Имя"></input>
                <input className="register__input" type='email' placeholder="E-mail"></input>
                <input className="register__input" type='password' placeholder="Пароль"></input>
                <span  className="register__span">Что-то пошло не так...</span>
            </form>
            <button className="register__button">Зарегистрироваться</button>
            <p className="register__text">Уже зарегистрированы?<Link className="register__link" to="/signup">Войти</Link></p>
        </div>
    ) 
}

export default Register;