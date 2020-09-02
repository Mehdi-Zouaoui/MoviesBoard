import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";
import '../styles.css';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'

function Navigation() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent position-relative" style={{zIndex : "1"}}>
                <Link className='navbar-brand' to={'/'}>Movies</Link>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-item active" to={'/search'}>Search</Link>
                    </li>
                </ul>

            </nav>
        </div>
    )
}

export default Navigation;
