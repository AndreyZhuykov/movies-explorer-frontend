import React from "react";

function NotFound() {
    return(
            <div className="not-found">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__text">Страница не найдена</p>
                <a className="not-found__link" href="/">Назад</a>
            </div>
    )
}

export default NotFound;