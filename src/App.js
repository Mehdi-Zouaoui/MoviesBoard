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
    // const {index} = useParams();
    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState({});

    useEffect(() => {
        // console.log(index);
        axios.get(`http://localhost:3000/movies`).then(item => {
            console.log(item.data);
            setMovies(item.data);
            setCurrentMovie(item.data[0]);
        });
    }, []);

  return (
    <div className="App">
    <Router>
        <Navigation/>
        <Switch>
            <Route exact path="/movies" component={() => <Movies movies={movies} currentMovie={currentMovie}/>}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/movies/:id" component={() => <Details movies={movies}/>}/>
            <Route exact path="/movie/edit/:id" component={() => <SearchResult movies={movies}/>}/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
