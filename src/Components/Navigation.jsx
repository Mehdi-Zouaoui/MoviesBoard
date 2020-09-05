import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faStar, faVideo} from "@fortawesome/free-solid-svg-icons";
import '../styles.css';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'

function Navigation() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning d-flex justify-content-between align-items-center " style={{zIndex : "1"}}>
                <Link className='navbar-brand ml-2' to={'/movies'}> <FontAwesomeIcon icon={faVideo}/>  Movies</Link>
                <p className="project_title"> Movies Board</p>
                <Link className='navbar-brand' to={'/search'}> <FontAwesomeIcon icon={faSearch}/> Search</Link>

            </nav>
        </div>
    )
}

export default Navigation;
