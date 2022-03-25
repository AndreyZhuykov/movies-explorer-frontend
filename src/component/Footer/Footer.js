import React from "react";

function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy; {year}</p>
                <ul className="footer__list">
                    <li className="footer__item">
                        <a className="footer__link" href="https://practicum.yandex.ru/" rel="noreferrer" target="_blank">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="https://github.com/" rel="noreferrer" target="_blank">Github</a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="https://ru-ru.facebook.com/" rel="noreferrer" target="_blank">Facebook</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer