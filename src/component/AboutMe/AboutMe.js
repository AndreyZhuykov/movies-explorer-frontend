import React from 'react';
import Photo from "../../images/photo.jpg"

function AboutMe() {

    return(
        <div className='about-me' id='about-me'>
            <h2 className='about-me__title'>Студент</h2>
            <img className='about-me__photo' src={Photo} alt='Персональное фото'/>
            <h3 className='about-me__name'>Виталий</h3>
            <p className='about-me__job'>Фронтенд-разработчик, 30 лет</p>
            <p className='about-me__description'>Я родился и живу в Саратове, закончил факультет экономики СГУ.
                У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
                Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
                и ушёл с постоянной работы.</p>
            <ul className='about-me__list-link'>
                <li>
                    <a className='about-me__link' href='https://ru-ru.facebook.com/' rel="noreferrer" target="_blank">Facebook</a>
                </li>
                <li>
                    <a className='about-me__link' href='https://github.com/' rel="noreferrer" target="_blank">Github</a>
                </li>
            </ul>
        </div>
    )
}

export default AboutMe