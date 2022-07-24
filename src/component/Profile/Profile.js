import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [isEmailValid, setIsEmailValid] = React.useState(true)
    const [isNameValid, setIsNameValid] = React.useState(true)
    const validator = require("validator");
    
    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]); 

    function handleSubmit(e) {
        e.preventDefault()
        props.onProfile(name, email);
    }

    function handleName(e) {
        setName(e.target.value)
        if (e.target.validity.valid === true) {
            setIsNameValid(true)
        }  else if (props.name !== name) {
            setIsNameValid(true)
        } else {
            setIsNameValid(false)
        }
    }

    function handleEmail(e) {
        setEmail(e.target.value)
        if (validator.isEmail(e.target.value) === true) {
            setIsEmailValid(true)
        } else if (currentUser.email !== email) {
            setIsEmailValid(true)
        } else {
            setIsEmailValid(false)
        }
    }


    const dataChanged = props.email !== email || props.name !== name;
    const validStatus = isNameValid && isEmailValid;
    const formReady =  dataChanged && validStatus;

    console.log(validStatus)
    console.log(dataChanged)

    return(
        <div className="profile">
            <h2 className="profile__title" >Привет, {props.name}!</h2>
            <form className="profile__form" onSubmit={handleSubmit} >
                <input className="profile__input" placeholder="Имя" type='text' onChange={handleName} required value={name}></input>
                <input className="profile__input" placeholder="E-mail" type='email' onChange={handleEmail} required value={email}></input>
                {props.succes ? <span className="profile__span">Успешно!</span> : <span className="profile__span"></span>}
                {formReady ? <button className="profile__button" type='submit'>Редактировать</button> : <button className="profile__button" type='submit' disabled>Редактировать</button>}
                <button className="profile__button profile__button_exit" onClick={props.onSignOut}>Выйти из аккаунта</button> 
                
            </form>
        </div>
    ) 
}

export default Profile