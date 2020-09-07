import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./Components/Search";
import {BrowserRouter as Router, Switch, Route, Redirect, useParams} from 'react-router-dom'
import SearchResult from "./Components/SearchResult";
import Movies from "./Components/Movies";
import Navigation from "./Components/Navigation";
import Details from "./Components/Details";
import axios from "axios";


function App() {

    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState({});

    const [index, setIndex] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:3000/movies`).then(item => {
            console.log(item.data);
            setMovies([...item.data]);
            setCurrentMovie(item.data[0]);
        });
    }, []);

    const deleteMovie = (id)=> {
        console.log(id);
        axios.delete(`http://localhost:3000/movies/` + id)
            .then((item) => {
                console.log(item);
               setMovies(movies.filter((item , index) => {
                   return item.id !== id
               }))
            })
            .catch(err => console.error(err));
    };

    const addMovie = (movie) => {
        console.log(movie);
        let id = 0;
        movies.forEach(item => {
            id = item.id
        });
        movie['id']= id+1;
            setMovies([...movies , movie])
    };
    const updateMovie = (movie , id) => {
        const array = movies;
        movies.find(item  => {
           if(item.id == id){
               const index = movies.indexOf(item);
               movie['id']= id*1;
               array[index] = movie;
               setMovies([...array]);
               console.log(movies)
                       }
        })
    };

  return (
    <div className="App">
    <Router>
        <Navigation/>
        <Switch>
            <Route exact path="/movies" component={() => <Movies movies={movies} index={index} currentMovie={currentMovie} delete={deleteMovie}/>}/>
            <Route exact path="/search" component={() => <Search movies={movies} add={addMovie}/>}/>
            <Route exact path="/movies/:id" component={() => <Details movies={movies} currentMovie={currentMovie} delete={deleteMovie}/>}/>
            <Route exact path="/movie/edit/:id" component={() => <SearchResult movies={movies}  update={updateMovie} />}/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
