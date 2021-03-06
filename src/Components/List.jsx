import React, {useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from 'axios';
import SearchResult from "./SearchResult";

function List(props) {

    const apiKey = "7de0ea6cc8752d95f4cb988e9e3e333b";
    const [card, setCard] = useState([]);
    const [currentSearch, setCurrentSearch] = useState({});

    // Reqûetes pour récuperer les acteurs , films similaires et genres du film selectionner par l'utilisateur
    // et les ajouter aux données de celui ci
    const getData = (item) => {

        const actorsRequest = axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${apiKey}`);
        const similarMovies = axios.get(`https://api.themoviedb.org/3/movie/${item.id}/similar?api_key=${apiKey}`);
        const requestDetails = axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}`);

        axios.all([actorsRequest, similarMovies, requestDetails])
            .then(axios.spread((...res) => {
                const actorRequest = res[0];
                const similarRequest = res[1];
                const genreRequest = res[2];
                const actorsArray = actorRequest.data.cast.slice(0, 6);
                const similarArray = similarRequest.data.results.slice(0, 4);
                const genresArray = genreRequest.data.genres;
                setCurrentSearch({...item, actors: actorsArray, similar: similarArray, genres: genresArray});
            }))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        props.films.forEach(film => {
            film.data.results.forEach(res => {
                setCard(oldCards => [...oldCards, res]);
            });
        });
    }, []);
    const addMovie = (movie) => {
        props.add(movie);
    };

    return (
        <div>
            {!card.length ?
                <div className="mt-2">No Movies Found</div>
                :
                <Dropdown className="mt-2 text-center">
                    <Dropdown.Toggle style={{marginBottom: '10px'}}
                                     variant="success"
                                     id="dropdown-basic">Research
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{left: '-40px !important'}}>
                        {card.map((item, index) => {
                            return (
                                <Dropdown.Item onClick={() => getData(item)}
                                               key={index}>{item.title}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            }
            {Object.keys(currentSearch).length > 0 ?
                <SearchResult data={currentSearch} movies={props.movies} add={addMovie}/> : ''}
        </div>
    );
}

export default List;
