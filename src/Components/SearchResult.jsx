import React, {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import axios from 'axios';
import '../styles.css';
import {BrowserRouter as Router, Switch, Route, Redirect, Link, useParams} from 'react-router-dom'

function SearchResult(props) {

    const {register, handleSubmit, setValue} = useForm();
    const [redirectTo, setRedirectTo] = useState("");
    const imgUrl = "http://image.tmdb.org/t/p/original";
    const params = useParams();
    const [currentEdit, setCurrentEdit] = useState({});
    const [actors, setActors] = useState([]);
    const [similar, setSimilar] = useState([]);
    // const {fields , append , prepend , remove} = useFieldArray({
    //     control,
    //     name :
    // })

    useEffect(() => {
        if (params.id) {
            setCurrentEdit(props.movies.filter(movie => movie.id == params.id));

        } else {
            props.data.actors.forEach((item, index) => {
                setValue(`actorName_${index}`, item.name);
                setValue(`imgUrl_${index}`, imgUrl + item.profile_path);
                setValue(`character_${index}`, item.character)
            });
            props.data.similar.forEach((item, index) => {
                setValue(`similarTitle_${index}`, item.title);
                setValue(`similarPosterUrl_${index}`, imgUrl + item.poster_path);
                setValue(`similarDate_${index}`, item.release_date)
            });
            setValue('title', props.data.title);
            setValue("overview", props.data.overview);
            setValue("date", props.data.release_date);
            setValue("note", props.data.vote_average);
            setValue("poster", imgUrl + props.data.poster_path);
            setValue("backdrop", imgUrl + props.data.backdrop_path);
        }


    }, []);
    const actorsFields = (array) => {
        return (array.map((item, index) => {
                return (
                    <div className="col-12 row justify-content-center" key={index}>
                        <div className=" form-group col-md-4">
                            <label className="label--desc col-8 text-center">name</label>
                            <input type="text" className="actorInput col-12  m-0" id="inputCity"
                                   ref={register} name={'actorName_' + index}/>

                        </div>
                        <div className="form-group col-4">
                            <label className="label--desc col-8 text-center"> image url</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   ref={register} name={'imgUrl_' + index}/>

                        </div>
                        <div className="form-group col-md-4">
                            <label className="label--desc col-8 text-center">character</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   ref={register} name={'character_' + index}/>

                        </div>
                    </div>
                )
            })
        )
    };

    const similarFields = (array) => {
        console.log(array)
        return (
            array.map((item, index) => {
                return (
                    <div className="col-12 row justify-content-center" key={index}>
                        <div className=" form-group col-md-3">
                            <label className="label--desc col-8 text-center">title</label>
                            <input type="text" className="actorInput col-12  m-0" id="inputCity"
                                   ref={register} name={'similarTitle_' + index}/>

                        </div>
                        <div className="form-group col-3">
                            <label className="label--desc col-8 text-center"> image url</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   ref={register} name={'similarPosterUrl_' + index}/>

                        </div>
                        <div className="form-group col-md-3">
                            <label className="label--desc col-8 text-center">date</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   ref={register} name={'similarDate_' + index}/>

                        </div>
                    </div>
                )
            })
        )

    };

    const badges = (array) => {
        array.map((item, index) => {
            return (
                <h2 className="col-2" key={index}><span className="badge  badge-dark ">{item.name}</span></h2>
            )
        })
    };


    const addData = () => {

    };

    const edit = (movie) => {
        console.log(movie);
        if (movie !== undefined) {
            setValue('title', movie.title);
            setValue("overview", movie.description);
            setValue("date", movie.release_date);
            setValue("note", movie.score);
            setValue("poster", imgUrl + movie.poster);
            setValue("backdrop", imgUrl + movie.backdrop);
            console.log(movie.actors);
                movie.actors.forEach((item, index) => {
                    setValue(`actorName_${index}`, item.name);
                    setValue(`imgUrl_${index}`, imgUrl + item.profile_path);
                    setValue(`character_${index}`, item.character)
                });

                movie.similar_movies.forEach((item, index) => {
                    setValue(`actorName_${index}`, item.title);
                    setValue(`imgUrl_${index}`, imgUrl + item.poster_path);
                    setValue(`character_${index}`, item.release_date)
                });

        }
    };
    const onSubmit = (data) => {
        const categories = [];
        props.data.genres.forEach(item => {
            categories.push(item.name)
        });

        const actors = props.data.actors.map(item => {
            return ({
                    name: item.name,
                    photo: imgUrl + item.profile_path,
                    character: item.character
                }
            )
        });
        const similarMovies = props.data.similar.map(item => {
            return (
                {
                    title: item.title,
                    poster: imgUrl + item.poster_path,
                    release_date: item.release_date
                }
            )
        });
        console.log(similarMovies);
        const movieObj = {
            title: data.title,
            release_date: data.date,
            categories: categories,
            score: data.note,
            description: data.overview,
            poster: data.poster,
            backdrop: data.backdrop,
            actors: actors,
            similar_movies: similarMovies,
        };
        axios.post("http://localhost:3000/movies", movieObj).then(res => {
            console.log('movie res', res);
        }).catch(err => console.error(err));

        setRedirectTo('/movies')
    };
    return (
        <div>
            {redirectTo ? <Redirect to={redirectTo}/> : ''}
            {currentEdit ? edit(currentEdit[0]) : ''}
            <form className="m-auto col-9" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row mb-4">
                    <div className="name"> Name</div>
                    <div className="value">
                        <div className="row row-space justify-content-center">
                            <div className="col-9">
                                <input type="text" className="inputStyle col-12" id="inputEmail4" name="title"
                                       ref={register}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row col-9 mb-4">
                    <div className="name"> Details</div>
                    <div className="value">
                        <div className="row justify-content-center row-space">
                            <div className="col-6">
                                <input type="text" className="inputStyle col-8" id="inputEmail4" name="date"
                                       ref={register}/>
                                <label className="label--desc col-8 text-center">Date</label>
                            </div>
                            <div className="col-6">
                                <input type="text" className="inputStyle col-8" id="inputEmail4" name="note"
                                       ref={register}/>
                                <label className="label--desc"> Note </label>

                            </div>


                        </div>
                    </div>

                </div>
                <div className="form-row mb-4">
                    <div className="name"> Poster</div>
                    <div className="value">
                        <div className="row row-space">
                            <div className="col-12">
                                <input type="text" className="inputStyle col-10" id="inputEmail4" name="poster"
                                       ref={register}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row mb-4">
                    <div className="name"> Backdrop</div>
                    <div className="value">
                        <div className="row row-space">
                            <div className="col-12">
                                <input type="text" className="inputStyle col-10" id="inputEmail4" name="backdrop"
                                       ref={register}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row m-b-55">
                    <div className="name"> Description</div>
                    <div className="value">
                        <div className="row row-space">
                            <div className="col-12">
                            <textarea type="text" className="textAreaStyle col-10 form-group" id="inputEmail4"
                                      name="overview"
                                      ref={register} rows={3}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row mb-4">
                    <div className="name"> Similar</div>
                    <div className="value">
                        <div className="row justify-content-center">
                            {currentEdit[0] && params.id ? similarFields(currentEdit[0].similar_movies) : ''}
                            {params.id ? '' : similarFields(props.data.similar)}
                            <div className="col-10 row justify-content-between">
                                <button className="btn btn-dark col-5"> + Add actor</button>
                                <button className="btn btn-danger col-5">Remove actor</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row mb-4">
                    <div className="name"> Actors</div>
                    <div className="value">
                        <div className="row justify-content-center">
                            {currentEdit[0] && params.id ? actorsFields(currentEdit[0].actors) : ''}
                            {params.id ? '' : actorsFields(props.data.actors)}
                            <div className="col-10 row justify-content-between">
                                <button className="btn btn-dark col-5"> + Add actor</button>
                                <button className="btn btn-danger col-5">Remove actor</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="name"> Genre</div>
                    <div className="value">
                        <div className="row ml-5">
                            {currentEdit[0] && params.id ? badges(currentEdit[0].categories) : ''}
                            {params.id ? '' : badges(props.data.genres)}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </div>);
}

export default SearchResult;
