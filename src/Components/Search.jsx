import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";
import '../styles.css';

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
                  className="mt-5 mx-auto py-3  col-10  ">
                <div className="form-row mb-4">
                    <div className="name"> Titre</div>
                    <div className="value">
                        <div className="row row-space">
                            <div className="col-12">
                                <input type="text" className="inputStyle col-10" id="inputEmail4" name="title"
                                       ref={register}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row mb-4">
                    <div className="name"> Date</div>
                    <div className="value">
                        <div className="row row-space">
                            <div className="col-12">
                                <input type="date" id='date' name="date" className=" inputStyle  col-10" ref={register}/>
                            </div>
                        </div>
                    </div>
                </div>

                <input className="btn mt-3 btn-dark col-4 " type="submit" value="Envoyer"/>

            </form>
            {films.length ? <List array={films}/> : ""}


        </div>
    )
}

export default Search
