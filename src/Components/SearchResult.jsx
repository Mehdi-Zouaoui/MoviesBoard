import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";


function SearchResult(props) {

    const {register, handleSubmit, setValue} = useForm();

    useEffect(() => {
        const actors = [];
        const similarMovies = [];
        props.data.actors.forEach(item => {
            actors.push(item.name)
        });
        props.data.similar.forEach(item => {
            similarMovies.push(item.title)
        });
        console.log('data', props.data);
        setValue("title", props.data.title);
        setValue("overview", props.data.overview);
        setValue("date", props.data.release_date);
        setValue("note", props.data.vote_average);
        setValue("actor", actors.join('\n'));
        setValue("similar" , similarMovies.join('\n'))
    }, []);

    const addData = () => {

    };

    return (<div className='row'>

        <form className="m-auto col-10">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Title</label>
                    <input type="text" className="form-control" id="inputEmail4" name="title" ref={register}/>
                    <label htmlFor="inputCity">Date</label>
                    <input type="date" className="form-control" name="date" ref={register} id="inputCity"/>
                    <label htmlFor="inputCity">Note</label>
                    <input type="number" className="form-control" name="note" ref={register} id="inputCity"/>
                    <label htmlFor="exampleFormControlTextarea1">Genres</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1"
                              placeholder={'action' + '\n' + 'romance'}
                              rows="3"/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputAddress">Description</label>
                    <textarea  rows="5"  className="form-control" id="inputAddress" name="overview" ref={register}/>
                    <label htmlFor="inputCity">Acteurs</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" ref={register}
                              name="actor"
                              rows="3"/>
                    <button className="btn btn-primary">ADD</button>
                    <button className="btn btn-danger">remove</button>
                    <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Similar Movies</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" ref={register}
                              name="similar"
                              rows="3"/>
                    </div>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Sign in</button>
        </form>

    </div>);
}

export default SearchResult;
