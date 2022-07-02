import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import headerLogo from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation';


function Header(props) {
    const [isActive, setIsActive] = useState(false);
    

    function openNavigation() {
        setIsActive(true);
    }

    function closeNavigation() {
        setIsActive(false);
    }


    return (
            <Routes>
                <Route path='/' element={<>
                    {!props.isLoggedIn ? 
                        <header className='header'>
                        <Link to='/'>
                            <img className='header__logo' alt='Логотип' src={headerLogo}/>
                        </Link>
                        <Link className='header__link' to="/signup">Регистрация</Link>
                        <Link className='header__button' to="/signin">Войти</Link>
                        </header> 
                        :
                        <header className='header'>
                        <a href='/'>
                            <img className='header__logo' alt='Логотип' src={headerLogo}/>
                        </a>
                        <button className='header__burger' type="button" onClick={openNavigation}/>
                        <Navigation 
                            isOpen={isActive} 
                            onClose={closeNavigation}/>
                        </header>
                }
                </>
                }/>
                <Route path='/movies' element={
                    <header className='header'>
                    <Link to='/'>
                            <img className='header__logo' alt='Логотип' src={headerLogo}/>
                        </Link>
                    <button className='header__burger' type="button" onClick={openNavigation}/>
                    <Navigation 
                        isOpen={isActive} 
                        onClose={closeNavigation}/>
                    </header>
                }/>
                <Route path='/saved-movies' element={
                    <header className='header'>
                    <Link to='/'>
                            <img className='header__logo' alt='Логотип' src={headerLogo}/>
                        </Link>
                    <button className='header__burger' type="button" onClick={openNavigation}/>
                    <Navigation 
                        isOpen={isActive} 
                        onClose={closeNavigation}/>
                    </header>
                }/>
                <Route path='/profile' element={
                    <header className='header'>
                    <Link to='/'>
                            <img className='header__logo' alt='Логотип' src={headerLogo}/>
                        </Link>
                    <button className='header__burger' type="button" onClick={openNavigation}/>
                    <Navigation 
                        isOpen={isActive} 
                        onClose={closeNavigation}/>
                </header>
                }/>
                <Route path='/signin' element={
                    <header className='header header_alt'>
                        <Link to='/'>
                            <img className='header__logo' alt='Логотип' src={headerLogo}/>
                        </Link>
                    </header>
                }/>
                <Route path='/signup' element={
                    <header className='header header_alt'>
                        <Link to='/'>
                            <img className='header__logo' alt='Логотип' src={headerLogo}/>
                        </Link>
                    </header>
                }/>
            </Routes>  
    )
}

export default Header