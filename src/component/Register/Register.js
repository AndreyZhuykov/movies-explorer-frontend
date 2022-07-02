import React from "react";
import { Link } from "react-router-dom";


function Register(props) {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')

    const [isEmailValid, setIsEmailValid] = React.useState(false)
    const [isNameValid, setIsNameValid] = React.useState(false)
    const [isPasswordValid, setIsPasswordValid] = React.useState(false)

    const [emailError, setEmailError] = React.useState(false)
    const validator = require("validator");

    const validStatus = isNameValid && isEmailValid && isPasswordValid

    function handleEmail(e) {
        setEmail(e.target.value)
        if (validator.isEmail(e.target.value) === true) {
            setIsEmailValid(true)
            setEmailError(false)
        } else {
            setIsEmailValid(false)
            setEmailError(true)
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

    function handleName(e) {
        setName(e.target.value)
        if (e.target.validity.valid === true) {
            setIsNameValid(true)
        } else {
            setIsNameValid(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onRegister(name, email, password)
    }

    
    console.log(props.errorMessage)
    console.log(props.error)

    return(
        <div className="register">
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" type='name' placeholder="Имя" onChange={handleName} required minLength="2" maxLength="30"></input>
                <input className="register__input" type='email' placeholder="E-mail" onChange={handleEmail} required></input>
                <input className="register__input" type='password' placeholder="Пароль" onChange={handlePassword} required minLength="2" maxLength="100"></input>
                {!props.error ? <span  className="register__span"></span> : <span  className="register__span register__span_active">{props.errorMessage}</span>}
                {validStatus ? <span  className="register__span"></span> : <span  className="register__span register__span_active">Введите коректные данные</span>}
                {validStatus ? <button className="register__button" type='submit'>Зарегистрироваться</button> : <button className="register__button" type='submit' disabled>Зарегистрироваться</button>}
            </form>
            <p className="register__text">Уже зарегистрированы?<Link className="register__link" to="/signin">Войти</Link></p>
        </div>
    ) 
}

export default Register;