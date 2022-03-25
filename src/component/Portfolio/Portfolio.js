import React from "react";

function Portfolio() {
    return (
        <div className="portfolio">
            <h2 className='portfolio__title'>Портфолио</h2>
                <ul className='portfolio__list'>
                    <li className='portfolio__list-item'>
                        <a className='portfolio__list-link' href='https://github.com/AndreyZhuykov/how-to-learn'>Статичный сайт </a>
                        <a className='portfolio__list-link' href='https://github.com/AndreyZhuykov/how-to-learn'>↗</a>
                    </li>
                    <li className='portfolio__list-item'>
                        <a className='portfolio__list-link' href='https://github.com/AndreyZhuykov/russian-travel'>Адаптивный сайт</a>
                        <a className='portfolio__list-link' href='https://github.com/AndreyZhuykov/russian-travel'>↗</a>
                    </li>
                    <li className='portfolio__list-item'>
                        <a className='portfolio__list-link' href='http://mesto.praktikum.nomoredomains.work/'>Одностраничное приложение</a>
                        <a className='portfolio__list-link' href='http://mesto.praktikum.nomoredomains.work/'>↗</a>
                    </li>
                    
                </ul>
        </div>
    )
}

export default Portfolio