import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";
import '../styles.css';
import {faEdit, faStar} from "@fortawesome/free-solid-svg-icons";
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
                <div className="col-10 d-flex flex-column text-left ">
                    <p className="description">{details.title}</p>
                    <p>{details.categories ? details.categories.join(' ') : ''}</p>
                    <p className="description">{details.description}</p>
                    <p><FontAwesomeIcon
                        icon={faStar}/></p>
                </div>
            </div>
            <div className="d-flex justify-content-between col-10 m-auto">
            <div className="d-flex flex-wrap col-6" style={{height : "220px"}}>
                { details.actors && details.actors.map((item , index) => {
                    return (
                        <div key={index} className="col-6 d-flex justify-content-between align-items-center">
                        <div className="actorPictures border border-dark"  style={{backgroundImage: `url(${item.photo})`}}/>
                        <div className="d-flex align-items-center" >{item.name}</div>
                        </div>
                    )
                })
                }
            </div>
            <div className="d-flex col-4 flex-wrap">
                { details.similar_movies && details.similar_movies.map((item , index) => {
                    return (
                        <div key={index} className="col-6" >
                        <div className=" similarPictures border border-dark"  style={{backgroundImage: `url(${item.poster})`}}/>
                        <div className="col-12" key={index}>{item.title}</div>
                        </div>
                    )
                })
                }
            </div>
            </div>
        </div>
                :''}
        </div>
    )
}

export default Details;
