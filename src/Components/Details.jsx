import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";
import '../styles.css';
import {faCalendarAlt, faList, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'
import {useParams} from "react-router";

function Details(props) {
    const params  = useParams();
    const [details, setDetails] = useState({});

    useEffect(() => {
        const currentMovie = props.movies.filter( movie => movie.id == params.id);
        setDetails(currentMovie[0]);
    }, []);
    return (
        <div>
        {details ?
                <div className="container justify-content-center">

            <div className="row col-12 m-auto position-relative">
                <div className='detail_backdrop row col-10 m-auto'
                     style={{backgroundImage: `url(${details.backdrop})`}}/>
            </div>
            <div className="details col-9">
                <div className='detail_poster col-3' style={{backgroundImage: `url(${details.poster})`}}/>
                <div className="col-10 d-flex flex-column text-left mb-2 ">
                    <p className="description_title">{details.title}</p>
                    <div className="col-7 description_cat d-flex  justify-content-between align-items-center">
                    <p> <FontAwesomeIcon className="text-warning mr-1" icon={faCalendarAlt}/> {details.release_date}</p>
                    <p><FontAwesomeIcon className="text-warning mr-1" icon={faList}/> {details.categories ? details.categories.join(' - ') : ''}</p>
                        <p><FontAwesomeIcon className="text-warning mr-1"
                                            icon={faStar}/> {details.score}</p>
                    </div>
                        <p className="description">{details.description}</p>

                </div>
            </div>
            <div className=" castInfo d-flex  justify-content-between col-10 m-auto">
                <div className="col-6 d-flex flex-column" style={{height :"270px"}}>
                <div className="details_actors"> Actors</div>
                    <div className="d-flex flex-wrap col-12" >
                        { details.actors && details.actors.map((item , index) => {
                            return (
                                <div key={index} className="d-flex col-6 justify-content-between" style={{height : '55px'}}>
                                    <div className="actorPictures border border-dark"  style={{backgroundImage: `url(${item.photo})`}}/>
                                    <div className="name d-flex align-items-center w-50" >{item.name}</div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className="col-6 d-flex flex-column ">
                <div className="details_actors"> Similar Movies</div>
                    <div className="d-flex col-12 flex-wrap">
                        { details.similar_movies && details.similar_movies.map((item , index) => {
                            return (
                                <div key={index} className="col-6" >
                                    <div className=" similarPictures border border-dark"  style={{backgroundImage: `url(${item.poster})`}}/>
                                    <div className=" similarTitle col-12" key={index}>{item.title}</div>
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
