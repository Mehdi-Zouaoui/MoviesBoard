import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";
import '../styles.css';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'

function Details(props) {

    const [details , setDetails] = useState({});

    useEffect(() => {
        setDetails(props.movie);
    },[]);
    return (
        <div className="container-fluid">
            details
                <div className='m-auto mt-5 row col-10 bg-dark' >{details.title}</div>

            </div>
    )
}

export default Details;
