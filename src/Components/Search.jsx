import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import List from "./List";
import '../styles.css';

function Search(props) {

    const apiKey = "7de0ea6cc8752d95f4cb988e9e3e333b";
    const [films, setFilms] = useState([]);
    const {register, handleSubmit} = useForm();

    // A l'envois , requêtes au serveur "the movie database" et récuperation des films
    const onSubmit = (data) => {
        setFilms([]);
        if (data.date.length <= 0 && data.title.length > 0) {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${capitalizeFirstLetter(data.title)}`)
                .then(item => {
                    setFilms(oldFilms => [...oldFilms, item]);
                })
                .catch(err => console.error(err));
        }
    };

    const addMovie = (movie) => {
        props.add(movie);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="mt-5">
            <form method="PUT"
                  onSubmit={handleSubmit(onSubmit)}
                  className=" formStyle col-9">
                <div className="form-row mb-4">
                    <div className="search_input m-auto"> Titre</div>
                    <div className=" col-xl-10 col-12">
                        <div className="row row-space">
                            <div className="col-12">
                                <input type="text"
                                       className="inputStyle col-12"
                                       id="inputEmail4"
                                       name="title"
                                       required
                                       ref={register}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row mb-4">
                    <div className="search_input m-auto"> Date</div>
                    <div className="col-xl-10 col-12">
                        <div className="row row-space">
                            <div className="col-12">
                                <input type="date"
                                       id='date'
                                       name="date"
                                       className=" inputStyle  col-12"
                                       ref={register}/>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row mb-4">
                    <div className="search_input m-auto"/>
                    <div className="col-xl-10 col-12 text-center">
                        <input className="btn mt-3 m-auto btn-dark col-6 "
                               type="submit"
                               value="Send"/>
                    </div>
                </div>
            </form>
            {/* Si il y a des films affichage de la liste*/}
            {films.length ? <List films={films} add={addMovie}/> : ''}
        </div>
    )
}

export default Search;
