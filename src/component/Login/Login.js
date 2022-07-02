import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [isEmailValid, setIsEmailValid] = React.useState(false)
    const [isPasswordValid, setIsPasswordValid] = React.useState(false)
    const validator = require("validator");

    const validStatus = isEmailValid && isPasswordValid    

    function handleMail(e) {
        setEmail(e.target.value)
        if (validator.isEmail(e.target.value) === true) {
            setIsEmailValid(true)
        } else {
            setIsEmailValid(false)
        }
    }

    function handlePassword(e) {
        setPassword(e.target.value)
        if (e.target.validity.valid === true) {
            setIsPasswordValid(true)
        } else {
            setIsPasswordValid(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onAuthorize(email, password)
    }

    
    return (
        <div className="login">
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__input" type='email' placeholder="E-mail" onChange={handleMail} required ></input>
                <input className="login__input" type='password' placeholder="Пароль" onChange={handlePassword} required minLength={3}></input>
                {!props.error ? <span  className="login__span"/> : <span className="login__span login__span_active">Что-то пошло не так...</span>}
                {isEmailValid ? <span className="login__span"/> : <span className="login__span login__span_active">Введите Email и пароль</span>}
                {validStatus ? <button className="login__button" type="submit">Войти</button> : <button className="login__button" type="submit" disabled>Войти</button>}
            </form>
            <p className="login__text">Ещё не зарегистрированы?<Link className="login__link" to="/signup">Регистрация</Link></p>
        </div>
    ) 
}

export default Login