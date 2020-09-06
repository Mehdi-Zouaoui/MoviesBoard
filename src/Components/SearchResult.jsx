import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import '../styles.css';
import {Redirect, useParams} from 'react-router-dom'
import Actors from "./Actors";
import SimilarMovies from "./SimilarMovies";


function SearchResult(props) {

    const {register, handleSubmit, setValue} = useForm({
    });
    const [redirectTo, setRedirectTo] = useState("");
    const imgUrl = "http://image.tmdb.org/t/p/original";
    const params = useParams();
    const [currentEdit, setCurrentEdit] = useState({});

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
                    <div className="col-12 row  justify-content-center align-items-center" key={index}>
                        <div className=" form-group col-4">
                            <label className="label--desc col-8 text-center">name</label>
                            <input type="text" className="actorInput col-12  m-0" id="inputCity"
                                   ref={register} name={`actor_${index}_name`}/>
                        </div>
                        <div className="form-group col-4">
                            <label className="label--desc col-8 text-center"> image url</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   ref={register} name={`actor_${index}_imgUrl`}/>

                        </div>
                        <div className="form-group col-4">
                            <label className="label--desc col-8 text-center">character</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   ref={register} name={`actor_${index}_character`}/>

                        </div>
                    </div>
                )
            })
        )
    };

    const similarFields = (array) => {

        return (
            array.map((item, index) => {
                return (
                    <div className="col-12 row justify-content-center align-items-center" key={index}>
                        <div className=" form-group col-4">
                            <label className="label--desc col-8 text-center">title</label>
                            <input type="text" className="actorInput col-12  m-0" id="inputCity"
                                   ref={register} name={'similarTitle_' + index}/>

                        </div>
                        <div className="form-group col-4">
                            <label className="label--desc col-8 text-center"> image url</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   ref={register} name={'similarPosterUrl_' + index}/>

                        </div>
                        <div className="form-group col-4">
                            <label className="label--desc col-8 text-center">date</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   ref={register} name={'similarDate_' + index}/>

                        </div>
                    </div>
                )
            })
        )

    };

const updateFiels = (data , query) => {
    const array = [];
    let index = 0;
    let test ={};
    for(const key in data){
        if(key.includes(query)){
            if(key.includes(query  + JSON.stringify(index))){
                test[key.split(`${query + index}_`)[1]] = data[key];
            }
            else{
                array.push(test);
                test = {};
                index++;
                test[key.split(`${query + index}_`)[1]] = data[key];
            }
        }
    }
    return array
};

    const edit = (movie) => {
        if (movie !== undefined) {

            setValue('title', movie.title);
            setValue("overview", movie.description);
            setValue("date", movie.release_date);
            setValue("note", movie.score);
            setValue("poster",  movie.poster);
            setValue("backdrop",  movie.backdrop);

            movie.actors.forEach((item, index) => {

                setValue(`actor_${index}_name`, item.name);
                setValue(`actor_${index}_imgUrl`, imgUrl + item.profile_path);
                setValue(`actor_${index}_character`, item.character)

            });

            movie.similar_movies.forEach((item, index) => {

                setValue(`actorName_${index}`, item.title);
                setValue(`imgUrl_${index}`, imgUrl + item.poster_path);
                setValue(`character_${index}`, item.release_date)

            });

        }
    };
    const onSubmit = (data) => {
        if(!params.id) {
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
            // axios.post("http://localhost:3000/movies", movieObj).then(res => {
            //     console.log('movie res', res);
            // }).catch(err => console.error(err));
            console.log(movieObj)
        }else{

            const actors = updateFiels(data , 'actor_');
            const similar = updateFiels(data , 'similar_');

            const movieObj = {
                title: data.title,
                release_date: data.date,
                categories: currentEdit[0].categories,
                score: data.note,
                description: data.overview,
                poster: data.poster,
                backdrop: data.backdrop,
                actors: actors,
                similar_movies: similar,
            };
            console.log('MY DATA' , movieObj);
            axios.put("http://localhost:3000/movies/" + params.id , movieObj).then(res => {
                console.log('res' , res)
            }).catch(err => console.error(err));
        }
        setRedirectTo('/movies')
    };
    return (
        <div className="mt-5">
            {redirectTo ? <Redirect to={redirectTo}/> : ''}
            {currentEdit ? edit(currentEdit[0]) : ''}
            <form className=" formStyle col-9" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row mb-4">
                    <div className="search_input m-auto"> Name</div>
                    <div className="col-xl-10 col-12">
                        <div className="row row-space">
                            <div className="col-12">
                                <input type="text" className="inputStyle col-12" id="inputEmail4" name="title"
                                       ref={register}/>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="form-row mb-4">
                    <div className="search_input m-auto"> Details</div>
                    <div className="col-xl-10 col-12">
                        <div className="row justify-content-between row-space">
                            <div className="col-6">
                                <input type="text" className="inputStyle col-12" id="inputEmail4" name="date"
                                       ref={register}/>
                                <label className="label--desc col-12 text-center">Date</label>
                            </div>
                            <div className="col-6">
                                <input type="text" className="inputStyle col-12" id="inputEmail4" name="note"
                                       ref={register}/>
                                <label className="label--desc"> Note </label>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="form-row mb-4">
                    <div className="search_input m-auto"> Poster</div>
                    <div className="col-xl-10 col-12">
                        <div className="row row-space">
                            <div className="col-12">
                                <input type="text" className="inputStyle col-12" id="inputEmail4" name="poster"
                                       ref={register}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row mb-4">
                    <div className="search_input m-auto"> Backdrop</div>
                    <div className="col-xl-10 col-12">
                        <div className="row row-space">
                            <div className="col-12">
                                <input type="text" className="inputStyle col-12" id="inputEmail4" name="backdrop"
                                       ref={register}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row m-b-55">
                    <div className="search_input m-auto"> Description</div>
                    <div className="col-xl-10 col-12">
                        <div className="row row-space">
                            <div className="col-12">
                            <textarea className="textAreaStyle col-12 form-group" id="inputEmail4"
                                      name="overview"
                                      ref={register} rows={3}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row mb-4">
                    <div className="search_input m-auto"> Similar</div>
                    <div className="col-xl-10 col-12 d-flex justify-content-start ">
                            {currentEdit[0] && params.id ?
                                <SimilarMovies  register={register({required:true})} similar={currentEdit[0].similar_movies}/> : ''}
                            {params.id ? '' : similarFields(props.data.similar)}
                    </div>
                </div>

                <div className="form-row mb-4">
                    <div className="search_input m-auto"> Actors</div>
                    <div className="col-xl-10 col-12">
                            {currentEdit[0] && params.id ? <Actors register={register({required:true})} actors={currentEdit[0].actors}/> : ''}
                            {params.id ? '' : actorsFields(props.data.actors)}
                    </div>
                </div>
                <div className="form-row">
                    <div className="search_input"> Genre</div>
                    <div className="col-10">
                        <div className="row ml-5">
                            {currentEdit[0] && params.id ? currentEdit[0].categories.map((item, index) => {
                                return (
                                    <h2 className="col-2" key={index}><span className="badge badge-dark ">{item}</span>
                                    </h2>
                                )
                            }) : ''}
                            {params.id ? '' : props.data.genres.map((item, index) => {
                                return (
                                    <h2 className="col-2" key={index}><span
                                        className="badge badge-dark ">{item.name}</span></h2>
                                )
                            })}
                        </div>
                    </div>
                    <button type="submit" className="btn col-6 btn-warning">Sign in</button>
                </div>


            </form>
        </div>);
}

export default SearchResult;
