import React from "react";


function Profile() {
    return(
        <div className="profile">
            <h2 className="profile__title" >Привет, Виталий!</h2>
            <form className="profile__form">
                <input className="profile__input" placeholder="Имя" type='text' required></input>
                <input className="profile__input" placeholder="E-mail" type='email' required></input>
                <button className="profile__button">Редактировать</button>
                <button className="profile__button profile__button_exit">Выйти из аккаунта</button>
            </form>
        </div>
    ) 
}

export default Profile