import React, {useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {Redirect} from "react-router";
import axios from 'axios';
import SearchResult from "./SearchResult";

function List(props) {
    const apiKey = "7de0ea6cc8752d95f4cb988e9e3e333b";
    const [redirectTo, setRedirectTo] = useState('');
    const [card, setCard] = useState([]);
    const [currentSearch, setCurrentSearch] = useState({});

    const getData = (item) => {
        const actorsRequest = axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${apiKey}`);
        const similarMovies = axios.get(`https://api.themoviedb.org/3/movie/${item.id}/similar?api_key=${apiKey}`);
        const requestDetails = axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}`);
        axios.all([actorsRequest, similarMovies , requestDetails]).then(axios.spread((...res) => {
            const actorRequest = res[0];
            const similarRequest = res[1];
            const genreRequest = res[2];
            const actorsArray = actorRequest.data.cast.slice(0, 6);
            const similarArray = similarRequest.data.results.slice(0, 4);
            const genresArray =  genreRequest.data.genres;
            setCurrentSearch({...item, actors: actorsArray, similar: similarArray , genres : genresArray});
        })).catch(err => console.error(err));

    };

    useEffect(() => {
        props.array.forEach(film => {
            film.data.results.forEach(res => {
                setCard(oldCards => [...oldCards, res]);
            });
        });

    }, []);

    return (

        <div>

            {!props.array.length ? <div>Loading</div> :
                <Dropdown>
                    <Dropdown.Toggle style={{marginBottom : '10px'}} variant="success" id="dropdown-basic">
                        Research
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {card.map((item, index) => {
                            return (
                                <Dropdown.Item onClick={() => getData(item)} key={index}>{item.title}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>

            }
            {Object.keys(currentSearch).length > 0 ? <SearchResult data={currentSearch}/> : ''}
        </div>
    );
}


export default List
