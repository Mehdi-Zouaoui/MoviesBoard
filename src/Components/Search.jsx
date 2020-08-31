import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";

function Search() {
    const [films, setFilms] = useState([]);

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {


    };

    useEffect(() => {
        axios.get('http://localhost:3000/movies').then(film => {

                setFilms([...films , film]);
                console.log(film)


        })
    }, []);

    return (
        <div>
            <form method="PUT" onSubmit={handleSubmit(onSubmit)}
                  className="mt-5 mx-auto py-3 card col-10  border border-info ">
                <div className="row col-6">
                    <label htmlFor="name" className="h3">Titre</label>
                    <input type="text" id='titre' className="form-control" name="titre" ref={register}
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
