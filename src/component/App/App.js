import React from 'react';
import {Routes, Route} from "react-router-dom";
import Main from '../Main/Main'
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';

function App() {

    return(
        <div className='app'>
            <Header/>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/movies' element={
                    <>
                    <Movies/>
                    <Footer/>
                    </>
            }/>
                <Route path='/saved-movies' element={
                    <>
                    <SavedMovies/>
                    <Footer/>
                    </>
                    }/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/signin' element={<Register/>}/>
                <Route path='/signup' element={<Login/>}/>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>    
        </div>
    )
}

export default App