import React from "react";
import img from '../../images/3bfd6b9af4141d2ee15e36a186b073a7.jpg'


function MoviesCard() {

    return(
    <>
        <article className="movies-card">
            <button className="movies-card__button movies-card__button_active" />
            <h3 className="movies-card__title">33 слова о дизайне</h3>
            <time className="movies-card__time">1ч 47м</time>
            <img className="movies-card__img" alt="/" src={img} />
        </article>
        <article className="movies-card">
            <button className="movies-card__button" />
            <h3 className="movies-card__title">33 слова о дизайне</h3>
            <time className="movies-card__time">1ч 47м</time>
            <img className="movies-card__img" alt="/" src={img} />
        </article>
        <article className="movies-card">
            <button className="movies-card__button" />
            <h3 className="movies-card__title">33 слова о дизайне</h3>
            <time className="movies-card__time">1ч 47м</time>
            <img className="movies-card__img" alt="/" src={img} />
        </article>
        <article className="movies-card">
            <button className="movies-card__button" />
            <h3 className="movies-card__title">33 слова о дизайне</h3>
            <time className="movies-card__time">1ч 47м</time>
            <img className="movies-card__img" alt="/" src={img} />
        </article>
        <article className="movies-card">
            <button className="movies-card__button" />
            <h3 className="movies-card__title">33 слова о дизайне</h3>
            <time className="movies-card__time">1ч 47м</time>
            <img className="movies-card__img" alt="/" src={img} />
        </article>
        <article className="movies-card">
            <button className="movies-card__button" />
            <h3 className="movies-card__title">33 слова о дизайне</h3>
            <time className="movies-card__time">1ч 47м</time>
            <img className="movies-card__img" alt="/" src={img} />
        </article>
    </>
    )
}

export default MoviesCard