import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faVideo} from "@fortawesome/free-solid-svg-icons";
import '../styles.css';
import {Link} from 'react-router-dom'

function Navigation() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning d-flex justify-content-between align-items-center " style={{zIndex : "1"}}>
                <Link className='navbar-brand ml-2 project_title' to={'/movies'}> <FontAwesomeIcon icon={faVideo}/>   Movies Board</Link>
                <Link className='navbar-brand project_title ' to={'/search'}> <FontAwesomeIcon icon={faSearch}/> Search</Link>

            </nav>
        </div>
    )
}

export default Navigation;
