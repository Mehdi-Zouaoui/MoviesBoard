import React, {useEffect} from "react";
import {useForm} from "react-hook-form";


function SearchResult(props){

    const {register , handleSubmit ,setValue} = useForm();

    useEffect(() => {
        console.log(props);
        setValue("title" , props.data.title);
        setValue("overview" , props.data.overview);
        setValue("date" , props.data.release_date);
        setValue("note" , props.data.vote_average);
    },[]);

    return(<div className='row'>

        <form className="m-auto col-10">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Title</label>
                    <input type="text" className="form-control" id="inputEmail4" name="title" ref={register}/>
                </div>
            </div>
            <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="inputAddress">Description</label>
                <input type="text" className="form-control" id="inputAddress" name="overview" ref={register}/>
            </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Date</label>
                    <input type="date" className="form-control" name="date" ref={register} id="inputCity"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Note</label>
                    <input type="number" className="form-control" name="note" ref={register} id="inputCity"/>
                </div>
            </div>
            <div className="form-row">
            <div className=" col-6">
                <div className="h5 text-light">Genre</div>
                <textarea className="form-control" id="exampleFormControlTextarea1"
                          placeholder={'action' + '\n' + 'romance'}
                          rows="3"/>

            </div>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
        </form>

    </div>);
}
export default SearchResult;
