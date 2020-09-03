import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";
import Carousel from "react-bootstrap/Carousel";
import {faTrash, faEdit, faFilm} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../styles.css';
import {Link} from 'react-router-dom'

function Movies(props) {
    const [index, setIndex] = useState(0);
    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState({});

    useEffect(() => {
        console.log(props.movies);
        setMovies(props.movies);
        setCurrentMovie(props.currentMovie);
    }, []);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setCurrentMovie(movies[selectedIndex]);
    };

    return (


        <div className="container-fluid overflow-hidden homepage"
             style={{backgroundImage: `url(${currentMovie.backdrop})`}}>
            <div className="filter"/>
            <main className="display">
                <div className="details">
                    <div className="h2 mb-5">{currentMovie.title}</div>
                    <div className="w-50 text-left  mb-5">{currentMovie.description}</div>
                    <div className=" mb-5">{currentMovie.categories}</div>
                </div>
                <Carousel interval={6000} indicators={false} activeIndex={index} className='w-25 mr-5'
                          onSelect={handleSelect}>
                    {movies.map((movie, index) => {
                        return (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={movie.poster}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        )
                    })}


                </Carousel>
                <div className="buttonContainer d-flex justify-content-between mt-2">
                    <Link to={`/movies/0`} className=" controlButton btn btn-light">Details <FontAwesomeIcon
                        icon={faFilm}/></Link>
                    <button className=" controlButton btn btn-dark">Update <FontAwesomeIcon
                        icon={faEdit}/></button>
                    <button className="controlButton btn btn-danger">Delete <FontAwesomeIcon
                        icon={faTrash}/></button>
                </div>
            </main>
            Movies
        </div>
    )

}

export default Movies;
