import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import headerLogo from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation';


function Header () {
    const [isActive, setIsActive] = useState(false);

    function openNavigation() {
        setIsActive(true);
    }

    function closeNavigation() {
        setIsActive(false);
    }


    return (
            <Routes>
                <Route path='/' element={
                    <header className='header'>
                        <img className='header__logo' alt='logo' src={headerLogo}/>
                        <Link className='header__link' to="/signin">Регистрация</Link>
                        <Link className='header__button' to="/signup">Войти</Link>
                    </header>
                }/>
                <Route path='/movies' element={
                    <header className='header'>
                    <img className='header__logo' alt='logo' src={headerLogo}/>
                    <button className='header__burger' type="button" onClick={openNavigation}/>
                    <Navigation 
                        isOpen={isActive} 
                        onClose={closeNavigation}/>
                    </header>
                }/>
                <Route path='/saved-movies' element={
                    <header className='header'>
                    <img className='header__logo' alt='logo' src={headerLogo}/>
                    <button className='header__burger' type="button" onClick={openNavigation}/>
                    <Navigation 
                        isOpen={isActive} 
                        onClose={closeNavigation}/>
                    </header>
                }/>
                <Route path='/profile' element={
                    <header className='header'>
                    <img className='header__logo' alt='logo' src={headerLogo}/>
                    <button className='header__burger' type="button" onClick={openNavigation}/>
                    <Navigation 
                        isOpen={isActive} 
                        onClose={closeNavigation}/>
                </header>
                }/>
                <Route path='/signin' element={
                    <header className='header header_alt'>
                        <img className='header__logo' alt='logo' src={headerLogo}/>
                    </header>
                }/>
                <Route path='/signup' element={
                    <header className='header header_alt'>
                        <img className='header__logo' alt='logo' src={headerLogo}/>
                    </header>
                }/>
            </Routes>  
    )
}

export default Header