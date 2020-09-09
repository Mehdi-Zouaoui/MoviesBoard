import React, {useEffect, useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import {faStar, faEdit, faFilm, faList, faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../styles.css';
import {Link} from 'react-router-dom'
import DeleteModal from "./DeleteModal";
import defaultBackdrop from '../assets/defautl_backdrop.jpg';
import defaultPoster from '../assets/poster_default.png'

function Movies(props) {

    const [index, setIndex] = useState(0);
    const [movies, setMovies] = useState([]);
    const [currentMovie, setCurrentMovie] = useState({});

    useEffect(() => {
        setMovies([...props.movies]);
        setCurrentMovie(props.currentMovie);
    }, []);

    //Gestion de slider
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
        setCurrentMovie(movies[selectedIndex]);
    };

    const deleteMovie = (id) => {
        props.delete(id);
    };

    return (
        <>
            {movies.length > 0 ?
                <div className="container-fluid overflow-hidden homepage"
                     style={{backgroundImage: `url(${currentMovie.backdrop}) , url(${defaultBackdrop})`}}>
                    <div className="filter"/>
                    <section className="display flex-column flex-xl-row">
                        <article className=" movie col-6 h-75 d-flex flex-column align-items-center justify-content-center text-white">
                            <h1 className=" mb-1 movie_title">{currentMovie.title}</h1>
                            <p className=" text-center movie_date text-warning mb-5">
                                <FontAwesomeIcon className="text-warning"
                                                 icon={faCalendarAlt}/> {currentMovie.release_date}</p>
                            <p className=" text-xl-center text-left movie_overview mb-5">{currentMovie.description}</p>
                            <div className="d-flex justify-content-center align-items-center movie_details">
                                <p className="movie_note">
                                    <FontAwesomeIcon className="text-warning"
                                                     icon={faList}/> {currentMovie.categories ? currentMovie.categories.join(' - ') : ''}
                                </p>
                                <p className=" text-center w-50">
                                    <FontAwesomeIcon className="text-warning"
                                                     icon={faStar}/>
                                    {currentMovie.score} / 10
                                </p>
                            </div>
                        </article>
                        <aside className="d-flex col-6 flex-column align-items-center">
                            <Carousel interval={100000}
                                      indicators={false}
                                      activeIndex={index}
                                      className=' w-50 '
                                      onSelect={handleSelect}>
                                {movies.map((movie, index) => {
                                    return (
                                        <Carousel.Item key={index}>
                                            <img className="d-block w-100"
                                                 src={movie.poster}
                                                 onError={(e)=>{e.target.onerror = null; e.target.src=`${defaultPoster}`}}
                                                 alt="First slide"
                                            />
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                            <div className="buttonContainer d-flex flex-column align-items-center justify-content-start flex-xl-row col-12 justify-content-xl-center mt-2">
                                <Link to={`/movies/${currentMovie.id}`}
                                      className=" btn mr-1 col-xl-2 w-75  btn-ico btn-outline-warning">Details <FontAwesomeIcon icon={faFilm}/>
                                </Link>
                                <Link to={`/movie/edit/${currentMovie.id}`}
                                      className="btn col-xl-2 w-75  mr-1  btn-ico btn-outline-warning">Update <FontAwesomeIcon icon={faEdit}/>
                                </Link>
                                <DeleteModal delete={deleteMovie}
                                             id={currentMovie.id}/>
                            </div>
                        </aside>
                    </section>
                </div>
                :
                <div className="alert alert-danger"
                     role="alert">
                    <h4 className="alert-heading">No Movies in your library </h4>
                    <p> Please add a movie </p>
                </div>
            }
        </>
    )
}

export default Movies;
