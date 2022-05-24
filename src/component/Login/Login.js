import React, { useState } from "react";
import { Link } from "react-router-dom";


function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isEmailValid, setIsEmailValid] = React.useState(false)
    const [isPasswordValid, setIsPasswordValid] = React.useState(false)

    const [buttom, setButton] = React.useState(false)

    const validStatus = isEmailValid && isPasswordValid



    function handleMail(e) {
        setEmail(e.target.value)
        if (e.target.validity.valid === true) {
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

    function formValidateCheck(){
        if(!validStatus){
            setButton(false)
        } else {
            setButton(true)
        }
    }

    return (
        <div className="login">
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__form" onChange={formValidateCheck} onSubmit={handleSubmit}>
                <input className="login__input" placeholder="E-mail" onChange={handleMail} required></input>
                <input className="login__input" placeholder="Пароль" onChange={handlePassword} required></input>
                {buttom ? <button className="login__button" type="submit">Войти</button> : <button className="login__button" type="submit" disabled>Войти</button>}
            </form>
            <p className="login__text">Ещё не зарегистрированы?<Link className="login__link" to="/signup">Регистрация</Link></p>
        </div>
    ) 
}

export default Login