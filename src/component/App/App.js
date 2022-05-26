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
    const [isFormError, setIsFormError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const navigate = useNavigate()

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

    const updateQuery = (query) => {
        query = query.toLowerCase()
        setQuery(query)
        localStorage.setItem('query', query)
    }

    function handleSubmitForApi(e) {
        e.preventDefault()
        if(query.length) {
            const filterMovies = movies.filter((movie) => 
                movie.nameRU.toLowerCase().indexOf(query) >= 0
            );
            updateFilterMovies(filterMovies);
        } 
    };

    function handleSubmitForSave(e) {
        e.preventDefault()
        if(query.length) {
            const filterMovies = saveMovies.filter((movie) => 
                movie.nameRU.toLowerCase().indexOf(query) >= 0
            );
            updateFilterSaveMovies(filterMovies);
        } 
    };

    function onProfile(name, email) {
        mainApi.updateUser(name, email)
        .then(res => {
            setName(name)
        })
    } 

    function onAuthorize(email, password) {
        setIsLoading(true)
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
        }).finally(
            setIsLoading(false)
        )
    }

    function onRegister(name, email, password) {
        setIsLoading(true)
        mainApi.register(name, email, password)
        .then(() => {
            onAuthorize(email, password)
            setIsLoggedIn(true)
            navigate('/signin')
        }).catch((err) => {
            console.log(err);
            setIsLoggedIn(false);
            setIsFormError(true)
            navigate('/signup')

        }).finally(
            setIsLoading(false)
        )
    }

    const addMovies = () => {
        setCount(count + moviesAddCount);
    }

    function saveMovie(movie) {
        setIsLoading(true)
        mainApi.saveMovie(movie).then((m)=> {
            updateSaveMovies([m, ...saveMovies]);
            updateFilterSaveMovies([m, ...saveMovies])
        }).catch((err) => {
            console.log(`Ошибка сохранения фильма: ${err}`)
        }).finally(
            setIsLoading(false)
        )
    } 
    function deleteMovie(data) {
        console.log(data)
        setIsLoading(true)
        mainApi.deleteMovie(data).then(() => {
            updateSaveMovies(saveMovies.filter((m) => m._id !== data._id))
            updateFilterSaveMovies(filterSaveMovies.filter((m) => m._id !== data._id))
        }).catch((err) => {
            console.log(`Ошибка удаления фильма: ${err}`)
        }).finally(
            setIsLoading(false)
        )
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

        setIsLoading(true)

        if(!movies.length) {
            moviesApi().then((movies) => {
                updateMovies(movies);
                updateFilterMovies([]);
            }).catch((err) => {
                console.log(`Ошибка загрузки фильмов с сервера: ${err}`)
            }).finally(
                setIsLoading(false)
            )
        } 

    },[]) 

    React.useEffect(() => {
        const saveMovies = JSON.parse(localStorage.getItem('save_movie') || '[]' );
        updateSaveMovies(saveMovies);
        updateFilterSaveMovies( JSON.parse(localStorage.getItem('filter_save_movies') || '[]'));
        
        setIsLoading(true)
        
        if (isLoggedIn === true){
            mainApi.getAppInfo().then(([users, movies]) => {
                setCurrentUser(users.user)
                updateSaveMovies(movies.data) 
                updateFilterSaveMovies([])
            }).catch((err) => {

                console.log(`Ошибка получения данных с сервера: ${err}`);
            }).finally(
                setIsLoading(false)
            )
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
                                        query={query}
                                        deleteMovie={deleteMovie}
                                    />
                                }
                                <Footer/>
                            </ProtectedRoute>
                        }/>
                    <Route path='/profile' element={
                        <ProtectedRoute loggedIn={isLoggedIn}>
                            {isLoading ? <Preloader/> : 
                                <Profile onProfile={onProfile} name={name} onSignOut={onSignOut}/>
                            }
                        </ProtectedRoute>
                    }/>
                    <Route path='/signup' element={<Register onRegister={onRegister} error={isFormError}/>}/>
                    <Route path='/signin' element={<Login onAuthorize={onAuthorize}/>}/>
                    <Route path='*' element={<NotFound/>}></Route>
                </Routes>    
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App