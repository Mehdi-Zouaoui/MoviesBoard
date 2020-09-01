import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";

function Search() {
    const apiKey = "7de0ea6cc8752d95f4cb988e9e3e333b";
    const [films, setFilms] = useState([]);
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        setFilms([]);
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${capitalizeFirstLetter(data.title)}`).then(item => {
            console.log(item.data);
            setFilms(oldFilms => [...oldFilms , item]);


        });

    };

    const  capitalizeFirstLetter = (string)  => {
       return string.charAt(0).toUpperCase() + string.slice(1);
    };


    useEffect(() => {

    }, [films]);

    return (
        <div>
            <form method="PUT" onSubmit={handleSubmit(onSubmit)}
                  className="mt-5 mx-auto py-3 card col-10  border border-info ">
                <div className="row col-6">
                    <label htmlFor="name" className="h3">Titre</label>
                    <input type="text" id='title' className="form-control" name="title" ref={register}
                           placeholder="Entrer un titre..."/>
                </div>
                <div className="row col-6">
                    <label htmlFor="name" className="h4">Date</label>
                    <input type="date" id='date' name="date" className="form-control" ref={register}/>
                </div>
                <input className="btn mt-3 btn-info col-2 " type="submit" value="Envoyer"/>

            </form>
            {films.length ? <List array={films}/> : <div>Loading</div>}


        </div>
    )
}

export default Search
