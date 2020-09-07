import React, {useEffect, useState} from "react";
import '../styles.css';
import {faCalendarAlt, faList, faStar , faTrash , faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useParams} from "react-router";
import DeleteModal from "./DeleteModal";
import {Link} from "react-router-dom";
import defaultActor from "../assets/default-profile.png"
import defaultSimilar from "../assets/poster_default.png"

function Details(props) {

    const params  = useParams();
    const [details, setDetails] = useState({});


    useEffect(() => {
        console.log(props)
        const currentMovie = props.movies.filter( movie => movie.id == params.id);
        setDetails(currentMovie[0]);
    }, []);

    return (
        <div>
        {details ?
            <div className="container">
                <div className="row detail_backdrop_container m-auto">
                    <div className='detail_backdrop row col-12 m-auto'
                         style={{backgroundImage: `url(${details.backdrop})`}}/>
                </div>
            <div className="details d-flex flex-xl-row flex-xl-nowrap justify-content-center flex-wrap col-9">
                <div className='detail_poster col-12 col-xl-3' style={{backgroundImage: `url(${details.poster})`}}/>
                <div className="col-12 d-flex flex-column text-center text-xl-left mb-2 ">
                    <p className="description_title">{details.title}</p>
                    <div className="col-xl-7 col-12 description_cat d-flex  justify-content-between align-items-center">
                        <p><FontAwesomeIcon className="text-warning mr-1"
                                             icon={faCalendarAlt}/>{details.release_date}</p>
                        <p><FontAwesomeIcon className="text-warning mr-1"
                                            icon={faList}/>{details.categories ? details.categories.join(' - ') : ''}</p>
                        <p><FontAwesomeIcon className="text-warning mr-1"
                                            icon={faStar}/>{details.score}</p>
                    </div>
                        <p className="description">{details.description}</p>
                    <div className=' d-flex justify-content-start'>
                        <DeleteModal noWord={true} delete={props.delete} id={details.id}/>
                        <Link to={`/movie/edit/${props.currentMovie.id}`}
                              className="btn col-1 mr-1  btn-dark"><FontAwesomeIcon icon={faEdit}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className=" castInfo d-flex  flex-column flex-xl-row  col-12 m-auto">
                <div className="col-xl-6 col-12 d-flex flex-column" style={{height :"270px"}}>
                    <div className="details_actors"> Actors</div>
                    <div className="d-flex flex-wrap justify-content-center col-12">
                        {details.actors && details.actors.map((item , index) => {
                            return (

                                <div key={index}
                                     className="d-flex col-6 align-items-center justify-content-xl-between justify-content-around"
                                     style={{height : '55px'}}>

                                    <div className="actorPictures border border-dark"
                                         style={{backgroundImage: `url(${item.photo}) ,url(${defaultActor})`}}/>
                                    <div className="name d-flex align-items-center">{item.name}</div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className="col-xl-6 col-12d-flex flex-column ">
                    <div className="details_actors"> Similar Movies</div>
                    <div className="d-flex col-12 flex-wrap">
                        {details.similar_movies && details.similar_movies.map((item , index) => {
                            return (
                                <div key={index} className="col-6" >
                                    <div className=" similarPictures border border-dark"
                                         style={{backgroundImage: `url(${item.poster}) , url(${defaultSimilar})`}}/>
                                    <div className=" similarTitle col-12"
                                         key={index}>{item.title}</div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>

            </div>
                :''}
        </div>
    )
}

export default Details;
