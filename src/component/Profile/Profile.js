import React, { useState } from "react";


function Profile(props) {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [isEmailValid, setIsEmailValid] = React.useState(false)
    const [isNameValid, setIsNameValid] = React.useState(false)

    const [buttom, setButton] = React.useState(false)

    const validStatus = isNameValid && isEmailValid 



    function handleName(e) {
        setName(e.target.value)
        if (e.target.validity.valid === true) {
            setIsNameValid(true)
        } else {
            setIsNameValid(false)
        }
    }

    function handleEmail(e) {
        setEmail(e.target.value)
        if (e.target.validity.valid === true) {
            setIsEmailValid(true)
        } else {
            setIsEmailValid(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onProfile(name, email)
    }

    function formValidateCheck(){
        if(!validStatus){
            setButton(false)
        } else {
            setButton(true)
        }
    }

    return(
        <div className="profile">
            <h2 className="profile__title" >Привет, {props.name}!</h2>
            <form className="profile__form" onSubmit={handleSubmit} onChange={formValidateCheck}>
                <input className="profile__input" placeholder="Имя" type='text' onChange={handleName} required></input>
                <input className="profile__input" placeholder="E-mail" type='email' onChange={handleEmail} required></input>
                {buttom ? <button className="profile__button" type='submit'>Редактировать</button> : <button className="profile__button" type='submit' disabled>Редактировать</button>}
                <button className="profile__button profile__button_exit" onClick={props.onSignOut}>Выйти из аккаунта</button> 
                
            </form>
        </div>
    ) 
}

export default Profile