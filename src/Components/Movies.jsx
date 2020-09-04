import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";
import Carousel from "react-bootstrap/Carousel";
import {faStar, faEdit, faFilm} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import '../styles.css';
import {Link, useParams} from 'react-router-dom'
import DeleteModal from "./DeleteModal";

function Movies(props) {
    const [index, setIndex] = useState(0);
    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState({});
    const params  = useParams();

    useEffect(() => {
        console.log(props.movies);
        setMovies(props.movies);
        setCurrentMovie(props.currentMovie);
    }, []);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
        setCurrentMovie(movies[selectedIndex]);
        setIndex(selectedIndex)
    };
    const deleteMovie = () => {
        axios.delete(`http://localhost:3000/movies/` + currentMovie.id).then((item) => {
            console.log(item);
        })  .catch(err => console.error(err));

    };

    return (
        <div className="container-fluid overflow-hidden homepage"
             style={{backgroundImage: `url(${currentMovie.backdrop})`}}>
            <div className="filter"/>
            <main className="display">
                <div className=" col-6 d-flex flex-column text-white">
                    <h1 className=" mb-5 title ">{currentMovie.title}</h1>
                    <p className=" text-center  description mb-5">{currentMovie.release_date}</p>
                    <p className=" text-center  description mb-5">{currentMovie.description}</p>

                    <div className=" mb-5">{ currentMovie.categories ?  currentMovie.categories.join(' ') : ''}</div>
                    <p className=" text-center  description mb-5"> <FontAwesomeIcon
                        icon={faStar}/> {currentMovie.score}</p>

                </div>
                <div className="d-flex col-6 flex-column align-items-center">
                <Carousel interval={10000} indicators={false} activeIndex={index} className=' w-50 '
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
                <div className="buttonContainer d-flex  col-12 justify-content-center mt-2">
                    <Link to={`/movies/${currentMovie.id}`} className=" btn mr-1 col-2 h-100 btn-ico btn-outline-secondary">Details <FontAwesomeIcon
                        icon={faFilm}/></Link>
                    <Link to={`/movie/edit/${currentMovie.id}`} className="btn col-2 mr-1 h-100 btn-ico btn-outline-secondary">Update <FontAwesomeIcon
                        icon={faEdit}/></Link>
                    <DeleteModal delete={deleteMovie} index={index}/>
                </div>
                </div>
            </main>
            Movies
        </div>
    )

}

export default Movies;
