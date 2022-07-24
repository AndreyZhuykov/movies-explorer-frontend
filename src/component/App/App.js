import React from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Main from '../Main/Main'
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login'
import moviesApi from '../../utils/MoviesApi';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UnsingProtectedRoute from '../UnsingProtectedRoute/UnsingProtectedRoute'
import Preloader from "../Preloader/Preloader"
import {mainApi} from '../../utils/MainApi'

let moviesCount = 0;
let moviesAddCount = 0;

const onResize = () => {
    if(window.innerWidth >= 1280){
        moviesCount = 12;
        moviesAddCount = 3;
    } else if (window.innerWidth >= 786) {
        moviesCount = 6;
        moviesAddCount = 2;
    } else if (window.innerWidth >= 320) {
        moviesCount = 5;
        moviesAddCount = 1;
    }
}

window.onresize = () => {
    setTimeout(() => {
        onResize();
    }, 1000);
};

onResize();

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [movies, setMovies] = React.useState([]);
    const [saveMovies, setSaveMovies] = React.useState([]);
    const [filterMovies, setFilterMovies] = React.useState([])
    const [filterSaveMovies, setFilterSaveMovies] = React.useState([])
    const [short, setShort] = React.useState(false);
    const [shortSaveMovie, setShortSaveMovie] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [saveMovieQuery, setSaveMovieQuery] = React.useState('');
    const [count, setCount] = React.useState(5);
    const [isFormError, setIsFormError] = React.useState(false);
    const [isFormSucces, setIsFormSucces] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState()
    const [isFormErrorMessage, setIsFormErrorMessage] = React.useState('');
    const [movieNotFound, setMovieNotFound] = React.useState(false)
    const [saveMovieNotFound, setSaveMovieNotFound] = React.useState(false)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const navigate = useNavigate();

    const updateMovies = (movies) => {
        setMovies(movies)
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    const updateSaveMovies = (saveMoves) => {
        setSaveMovies(saveMoves)
        localStorage.setItem('save_movies', JSON.stringify(saveMoves));
    }

    const updateFilterMovies = (movies) => {
        setFilterMovies(movies)
        localStorage.setItem('filter_movies', JSON.stringify(movies));
    }

    const updateFilterSaveMovies = (saveMoves) => {
        setFilterSaveMovies(saveMoves)
        localStorage.setItem('filter_save_movies', JSON.stringify(saveMoves));
    }
    
    const updateShort = (movies) => {
        setCount(moviesCount)
        setShort(movies)
        localStorage.setItem('short_movies', JSON.stringify(movies));
    }

    const updateShortSaveMovie = (saveMoves) => {
        setCount(moviesCount)
        setShortSaveMovie(saveMoves)
        localStorage.setItem('short_save_movies', JSON.stringify(saveMoves));
    }

    const updateMovieQuery = (query) => {
        query = query.toLowerCase()
        setQuery(query)
        localStorage.setItem('query', query)
    }

    const updateSaveMovieQuery = (query) => {
        query = query.toLowerCase()
        setSaveMovieQuery(query)
        localStorage.setItem('saveMovieQuery', query)
    }

    function handleSubmitForApi(e) {
        setIsLoading(true)
        e.preventDefault()
        if(query.length) {
            const filterMovies = movies.filter((movie) => 
                movie.nameRU.toLowerCase().indexOf(query) >= 0
            );
            updateFilterMovies(filterMovies);
            if (filterMovies.length === 0) {
                setMovieNotFound(true)
            } else {
                setMovieNotFound(false)
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
            
        } 
    };

    function handleSubmitForSave(e) {
        setIsLoading(true)
        e.preventDefault()
        if(query.length) {
            const filterMovies = saveMovies.filter((movie) => 
                movie.nameRU.toLowerCase().indexOf(query) >= 0
            );
            if (filterMovies.length === 0) {
                setSaveMovieNotFound(true)
            } else {
                setSaveMovieNotFound(false)
            }
            updateFilterSaveMovies(filterMovies);
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        } 
    };

    function onProfile(name, email) {
        mainApi.updateUser(name, email)
        .then(res => {
                setName(name)
                setEmail(email)
                setIsFormSucces(true)
        })
        .catch(err => {
            setIsFormError(true)
            setIsFormErrorMessage('Произошла ошибка обновления данных')
        })
    } 

    function onAuthorize(email, password) {
        mainApi.authorize(email, password)
        .then(res => {
            if (res.token) {
                localStorage.setItem('jwt', res.token)
                localStorage.setItem('isLoggedIn', true)
                setIsLoggedIn(true)
                navigate('/movies')
                setName(name)
                setEmail(email)
            } 
        }).catch((err) => {
            setIsLoggedIn(false)
            setIsFormError(true)
            navigate('/signin')
        })
    }

    function onRegister(name, email, password) {
        mainApi.register(name, email, password)
        .then((res) => {
            if(res.ok) {
                setName(name)
                setEmail(email)
                onAuthorize(email, password)
                navigate('/signin')
            } else if (res.status === 409){
                setIsFormError(true)
                setIsFormErrorMessage('Пользователь с таким Email уже зарегестрирован')
            }
        }).catch((err) => {
            setIsFormError(true)
            setIsFormErrorMessage('что-то пошло не так')
        })
    }

    const addMovies = () => {
        setCount(count + moviesAddCount);
    }

    function saveMovie(movie) {
        mainApi.saveMovie(movie).then((m)=> {
            updateSaveMovies([m, ...saveMovies]);
        }).catch((err) => {
            console.log(`Ошибка сохранения фильма: ${err}`)
        })
    } 

    function deleteMovie(data) {
        mainApi.deleteMovie(data).then(() => {
            updateSaveMovies(saveMovies.filter((m) => m._id !== data._id))
            updateFilterSaveMovies(filterSaveMovies.filter((m) => m._id !== data._id))
        }).catch((err) => {
            console.log(`Ошибка удаления фильма: ${err}`)
        })
    } 

    function onSignOut() {
        localStorage.removeItem("jwt")
        localStorage.clear()
        setIsLoggedIn(false)
        navigate('/')
        setFilterMovies([])
        setFilterSaveMovies([])
        setShort(false)
        setShortSaveMovie(false)
        setQuery('')
        setSaveMovieQuery('')
    }

    React.useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('movie') || '[]' );

        updateMovies(movies);
        updateFilterMovies( JSON.parse(localStorage.getItem('filter_movies') || '[]'));
        updateMovieQuery(localStorage.getItem('query') || '')
        updateShort(JSON.parse(localStorage.getItem('short_movies' || 'false')));

        if(!movies.length) {
            moviesApi().then((movies) => {
                updateMovies(movies);
                updateFilterMovies([]);
            }).catch((err) => {
                console.log(`Ошибка загрузки фильмов с сервера: ${err}`)
            })
        } 

    },[]) 

    React.useEffect(() => {
        const saveMovies = JSON.parse(localStorage.getItem('save_movie') || '[]' );
        updateSaveMovies(saveMovies);
        updateFilterSaveMovies( JSON.parse(localStorage.getItem('filter_save_movies') || '[]'));
        updateSaveMovieQuery(localStorage.getItem('saveMovieQuery') || '')
        updateShortSaveMovie(JSON.parse(localStorage.getItem('short_save_movies' || 'false')))
        
        if (isLoggedIn === true){
            mainApi.getAppInfo().then(([users, movies]) => {
                setCurrentUser(users.user)
                setName(users.user.name)
                setEmail(users.user.email)
                updateSaveMovies(movies.data) 
                updateFilterSaveMovies([])
            }).catch((err) => {
                console.log(`Ошибка получения данных с сервера: ${err}`);
            })
        }
    },[isLoggedIn]) 
    
    React.useEffect(() => {
        setIsLoading(true)
            setTimeout(() => {
                const jwt = localStorage.getItem("jwt")
                if (jwt) {
                    mainApi.checkToken(jwt)
                        .then((res) => {
                            if (res) {
                                insideDate()
                                setIsLoading(false)
                            }
                        })
                        .catch((err) => {
                            console.log(`Ошибка получения токена: ${err}`)
                            setIsLoggedIn(false)
                        })
            }
        }, 200);    
    }, [navigate])

    function insideDate() {
        setIsLoggedIn(true);
    }

    const userSaveMovie = saveMovies.filter(m => m.owner === currentUser._id)
    const userfilterSaveMovie = filterSaveMovies.filter(m => m.owner === currentUser._id)
    
    return(
        <CurrentUserContext.Provider value={currentUser}>
            <div className='app'>
            <Header isLoggedIn={isLoggedIn}/>
                <Routes>
                    <Route exact path='/' element={
                        <Main/>
                    }/>
                        <Route path='/movies' element={
                            isLoading ? <Preloader/> :
                                <ProtectedRoute loggedIn={isLoggedIn} >
                                    <Movies
                                        movies={filterMovies}
                                        saveMovies={userSaveMovie}
                                        handleSubmit={handleSubmitForApi}
                                        query={query}
                                        short={short}
                                        updateShort={updateShort}
                                        updateQuery={updateMovieQuery}
                                        count={count}
                                        addMovies={addMovies}
                                        saveMovie={saveMovie}
                                        movieNotFound={movieNotFound}
                                        deleteMovie={deleteMovie}
                                    />
                                    <Footer/>
                                </ProtectedRoute>   
                        }/>
                        <Route path='/saved-movies' element={
                            isLoading ? <Preloader/> :
                            <ProtectedRoute loggedIn={isLoggedIn}>
                                    <SavedMovies
                                        movies={userfilterSaveMovie}
                                        saveMovies={userSaveMovie}
                                        handleSubmit={handleSubmitForSave}
                                        updateQuery={updateSaveMovieQuery}
                                        updateShort={updateShortSaveMovie}
                                        query={saveMovieQuery}
                                        deleteMovie={deleteMovie}
                                        movieNotFound={saveMovieNotFound}
                                        short={shortSaveMovie}
                                    />
                                <Footer/>
                            </ProtectedRoute>
                        }/>
                    <Route path='/profile' element={
                        <ProtectedRoute loggedIn={isLoggedIn}>
                                <Profile 
                                    onProfile={onProfile} 
                                    name={name} 
                                    email={email}
                                    onSignOut={onSignOut} 
                                    error={isFormError} 
                                    errorMessage={isFormErrorMessage}
                                    succes={isFormSucces}
                                />
                        </ProtectedRoute>
                    }/>
                    <Route path='/signup' element={
                        <UnsingProtectedRoute loggedIn={isLoggedIn}>
                            <Register onRegister={onRegister} error={isFormError} errorMessage={isFormErrorMessage}/>
                        </UnsingProtectedRoute>
                    }
                    />
                    <Route path='/signin' element={
                        <UnsingProtectedRoute loggedIn={isLoggedIn}>
                            <Login onAuthorize={onAuthorize} error={isFormError} errorMessage={isFormErrorMessage}/>
                        </UnsingProtectedRoute>
                    }/>
                    <Route path='*' element={<NotFound/>}></Route>
                </Routes>    
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App