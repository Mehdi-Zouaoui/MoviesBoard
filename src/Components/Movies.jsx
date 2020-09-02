import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";
import Carousel from "react-bootstrap/Carousel";

import '../styles.css';

function Movies() {

    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/movies`).then(item => {
            console.log(item.data[0].categories);
            setCurrentMovie(item.data[0]);
        });
    }, []);

    return (
        <div className="container-fluid overflow-hidden homepage"
             style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/5myQbDzw3l8K9yofUXRJ4UTVgam.jpg")`}}>
            <div className="filter"/>
            <div className="details">
                <div className="h2 text-white">{currentMovie.title}</div>
                <div>{currentMovie.categories}</div>

            </div>
            Movies
        </div>
    )
}

export default Movies;
