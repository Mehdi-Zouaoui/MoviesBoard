import React, {useEffect, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {Redirect} from "react-router";
import SearchResult from "./SearchResult";

function List(props) {
    const [redirectTo, setRedirectTo] = useState('');
    const [card, setCard] = useState([]);
    const [currentSearch , setCurrentSearch] = useState({});
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
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {card.map((item, index) => {
                            return (
                                <Dropdown.Item onClick={() => setCurrentSearch(item)} key={index}>{item.title}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>

            }
            {Object.keys(currentSearch).length > 0 ? <SearchResult data={currentSearch} /> : ''}
            </div>
                );
                }


                export default List
