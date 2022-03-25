import React from 'react';

function AboutProject() {

    return(
            <div className='about-project' id="about-project">
                <h2 className='about-project__title'>О проекте</h2>
                <div className='about-project__container about-project__container_column'>
                    <div className='about-project__container-text'>
                    <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='about-project__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className='about-project__container-text'>
                    <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about-project__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='about-project__container'>
                    <p className='about-project__text about-project__text_green-box'>1 неделя</p>
                    <p className='about-project__text about-project__text_gray-box'>4 недели</p> 
                </div>                   
                <div className='about-project__container'>
                    <p className='about-project__text about-project__text_without-box'>Back-end</p>
                    <p className='about-project__text about-project__text_without-box'>Front-end</p>
                </div>
            </div>
    )
}

export default AboutProject