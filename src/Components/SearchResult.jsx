import React, {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import axios from 'axios';
import '../styles.css';

function SearchResult(props) {

    const {register, handleSubmit, setValue} = useForm();
    // const {fields , append , prepend , remove} = useFieldArray({
    //     control,
    //     name :
    // })

    useEffect(() => {
        const imgUrl = "http://image.tmdb.org/t/p/original";
        console.log(props.data);
        setValue('title', props.data.title);
        setValue("overview", props.data.overview);
        setValue("date", props.data.release_date);
        setValue("note", props.data.vote_average);
        setValue("poster",imgUrl+props.data.poster_path);
        setValue("backdrop", imgUrl+props.data.backdrop_path);

        props.data.actors.forEach((item, index) => {
            setValue(`actorName_${index}`, item.name);
            setValue(`imgUrl_${index}`, imgUrl + item.profile_path);
            setValue(`character_${index}`, item.character)
        });
        props.data.similar.forEach((item,index) => {
            setValue(`similarTitle_${index}`, item.title);
            setValue(`similarPosterUrl_${index}`, imgUrl + item.poster_path);
            setValue(`similarDate_${index}`, item.release_date)
        });

    }, []);

    const addData = () => {

    };
    const onSubmit = (data) => {

        for(let key in data){
            console.log(key)
        }
        const categories =[];
        props.data.genres.forEach(item => {
            categories.push(item.name)
        });

        const movieObj = {

            title: data.title,
            release_date: data.date,
            categories:categories,
            description: data.overview,
            poster : data.poster,
            backdrop : data.backdrop,
            actors : [{
                name:'test',
                photo:'http://image.tmdb.org/t/p/w185/uTjU9MVPhyLNs4cjacee3XoCmeE.jpg',
                character:'test'
            }],
            similar_movies : [{
                title : 'test',
                poster : 'http://image.tmdb.org/t/p/w185/uTjU9MVPhyLNs4cjacee3XoCmeE.jpg',
                release_date :data.date
            }],
        };
        axios.post("http://localhost:3000/movies" , movieObj).then(res => {
            console.log('movie res', res);
        }).catch(err => console.error(err));
        console.log(data)
    };

    return (<div>

        <form className="m-auto col-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row mb-4">
                <div className="name"> Name</div>
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
                <div className="name"> Details</div>
                <div className="value">
                    <div className="row row-space">
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
                            <textarea type="text" className="textAreaStyle col-10 form-group" id="inputEmail4" name="overview"
                                      ref={register}  rows={3}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-row mb-4">
                <div className="name"> Similar Movies</div>
                <div className="value">
                    <div className="row justify-content-center">
                        {props.data.similar.map((item, index) => {
                            return (
                                <div className="col-4 row justify-content-center"  key={index}>
                                    <div className=" form-group col-md-9">
                                        <label className="label--desc col-8 text-center">title</label>
                                        <input type="text" className="actorInput col-12  m-0" id="inputCity"
                                               ref={register} name={'similarTitle_' + index}/>

                                    </div>
                                    <div className="form-group col-9">
                                        <label className="label--desc col-8 text-center"> image url</label>
                                        <input type="text" className="actorInput col-12" id="inputCity"
                                               ref={register} name={'similarPosterUrl_' + index}/>

                                    </div>
                                    <div className="form-group col-md-9">
                                        <label className="label--desc col-8 text-center">date</label>
                                        <input type="text" className="actorInput col-12" id="inputCity"
                                               ref={register} name={'similarDate_' + index}/>

                                    </div>
                                </div>
                            )
                        })}
                        <div className="col-10 row justify-content-between">
                            <button className="btn btn-dark col-5"> + Add similar</button>
                            <button className="btn btn-danger col-5">Remove similar</button>
                        </div>

                    </div>
                </div>

            </div>

            <div className="form-row mb-4">
                <div className="name"> Actors</div>
                <div className="value">
                    <div className="row justify-content-center">
                        {props.data.actors.map((item, index) => {
                            return (
                                <div className="col-4 row justify-content-center"  key={index}>
                                    <div className=" form-group col-md-9">
                                        <label className="label--desc col-8 text-center">name</label>
                                        <input type="text" className="actorInput col-12  m-0" id="inputCity"
                                               ref={register} name={'actorName_' + index}/>

                                    </div>
                                    <div className="form-group col-9">
                                        <label className="label--desc col-8 text-center"> image url</label>
                                        <input type="text" className="actorInput col-12" id="inputCity"
                                               ref={register} name={'imgUrl_' + index}/>

                                    </div>
                                    <div className="form-group col-md-9">
                                        <label className="label--desc col-8 text-center">character</label>
                                        <input type="text" className="actorInput col-12" id="inputCity"
                                               ref={register} name={'character_' + index}/>

                                    </div>
                                </div>
                            )
                        })}
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
                            {props.data.genres.map((item, index) => {
                                return(
                                    <h2 className="col-2" key={index}><span className="badge  badge-dark ">{item.name}</span></h2>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>

            <button type="submit" className="btn btn-primary">Sign in</button>
        </form>

    </div>);
}

export default SearchResult;
