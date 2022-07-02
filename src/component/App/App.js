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
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
    const [query, setQuery] = React.useState('');
    const [count, setCount] = React.useState(5);
    const [name, setName] = React.useState('');
    const [isFormError, setIsFormError] = React.useState(false);
    const [isFormSucces, setIsFormSucces] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState()
    const [isFormErrorMessage, setIsFormErrorMessage] = React.useState('');
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
        setShort(saveMoves)
        localStorage.setItem('short_save_movies', JSON.stringify(saveMoves));
    }

    const updateQuery = (query) => {
        query = query.toLowerCase()
        setQuery(query)
        localStorage.setItem('query', query)
    }

    function handleSubmitForApi(e) {
        setIsLoading(true)
        e.preventDefault()
        if(query.length) {
            const filterMovies = movies.filter((movie) => 
                movie.nameRU.toLowerCase().indexOf(query) >= 0
            );
            updateFilterMovies(filterMovies);
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
                setName()
                localStorage.setItem('jwt', res.token)
                setIsLoggedIn(true)
                navigate('/movies')
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
            console.log(res.status)
            if(res.ok) {
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
        setIsLoggedIn(false)
        setName(null)
        navigate('/')
        localStorage.removeItem("jwt")
        localStorage.clear()
    }

    React.useEffect(() => {
        const movies = JSON.parse(localStorage.getItem('movie') || '[]' );

        updateMovies(movies);
        updateFilterMovies( JSON.parse(localStorage.getItem('filter_movies') || '[]'));
        updateQuery(localStorage.getItem('query') || '')
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
        updateShortSaveMovie(JSON.parse(localStorage.getItem('short_save_movies' || 'false')))
        
        if (isLoggedIn === true){
            mainApi.getAppInfo().then(([users, movies]) => {
                setCurrentUser(users.user)
                updateSaveMovies(movies.data) 
                updateFilterSaveMovies([])
            }).catch((err) => {
                console.log(`Ошибка получения данных с сервера: ${err}`);
            })
        }
    },[isLoggedIn]) 

    React.useEffect(() => {
        setTimeout(() => {
            const jwt = localStorage.getItem("jwt")
            if (jwt) {
                mainApi.checkToken(jwt)
                    .then((res) => {
                        if (res) {
                            setIsLoggedIn(true)
                            setName(res.user.name)
                        }
                    })
                    .catch((err) => {
                        console.log(`Ошибка получения токена: ${err}`)
                        setIsLoggedIn(false)
                    })
            }
        }, 100);
    }, [navigate])

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
                            <ProtectedRoute loggedIn={isLoggedIn}>
                                {isLoading ? <Preloader/> : 
                                <Movies
                                    movies={filterMovies}
                                    saveMovies={userSaveMovie}
                                    handleSubmit={handleSubmitForApi}
                                    query={query}
                                    short={short}
                                    updateShort={updateShort}
                                    updateQuery={updateQuery}
                                    count={count}
                                    addMovies={addMovies}
                                    saveMovie={saveMovie}
                                    deleteMovie={deleteMovie}
                                />
                                }
                                <Footer/>
                            </ProtectedRoute>
                        }/>
                        <Route path='/saved-movies' element={
                            <ProtectedRoute loggedIn={isLoggedIn}>
                                {isLoading ? <Preloader/> :
                                    <SavedMovies
                                        movies={userfilterSaveMovie}
                                        saveMovies={userSaveMovie}
                                        handleSubmit={handleSubmitForSave}
                                        updateQuery={updateQuery}
                                        updateShort={updateShortSaveMovie}
                                        query={query}
                                        deleteMovie={deleteMovie}
                                        short={short}
                                    />
                                }
                                <Footer/>
                            </ProtectedRoute>
                        }/>
                    <Route path='/profile' element={
                        <ProtectedRoute loggedIn={isLoggedIn}>
                            {isLoading ? <Preloader/> : 
                                <Profile 
                                    onProfile={onProfile} 
                                    name={name} 
                                    onSignOut={onSignOut} 
                                    error={isFormError} 
                                    errorMessage={isFormErrorMessage}
                                    succes={isFormSucces}
                                />
                            }
                        </ProtectedRoute>
                    }/>
                    <Route path='/signup' element={<Register onRegister={onRegister} error={isFormError} errorMessage={isFormErrorMessage}/>}/>
                    <Route path='/signin' element={<Login onAuthorize={onAuthorize} error={isFormError} errorMessage={isFormErrorMessage}/>}/>
                    <Route path='*' element={<NotFound/>}></Route>
                </Routes>    
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App