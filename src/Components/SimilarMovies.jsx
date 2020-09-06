import React, {useEffect} from "react";
import {useForm, useFieldArray, useWatch} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

function SimilarMovies(props) {

    const {register, control} = useForm({
        defaultValues: {
            similar: props.similar
        }
    });
    const {fields, append, remove} = useFieldArray({
        control,
        name: "similar"
    });
    useEffect(() => {
        console.log(props)
    });
    return (
        <div className="row">
            {fields.map((item, index) => {
                return (
                    <div className="col-12 row  justify-content-center align-items-center" key={index}>
                        <div className="col-2 row">
                            <button className="btn btn-danger buttonStyle col-6" onClick={() => remove(index)}>
                                <FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                        <div className=" form-group col-4">
                            <label className="label--desc col-8 text-center">name</label>
                            <input type="text" className="actorInput col-12  m-0" id="inputCity"
                                   defaultValue={`${item.title}`}
                                   ref={register()} name={'actorName_' + index}/>
                        </div>
                        <div className="form-group col-3">
                            <label className="label--desc col-8 text-center"> image url</label>
                            <input type="url" className="actorInput col-12" id="inputCity"
                                   defaultValue={`${item.poster}`}
                                   ref={register} name={'imgUrl_' + index}/>

                        </div>
                        <div className="form-group col-3">
                            <label className="label--desc col-8 text-center">character</label>
                            <input type="date" className="actorInput col-12" id="inputCity"
                                   defaultValue={`${item.release_date}`}
                                   ref={register} name={'character_' + index}/>

                        </div>

                    </div>

                );
            })}
            <button type="button" className="btn btn-dark col-6 m-auto"  onClick={() => {
                append({ title: "",poster: "" , release_date: "" });
            }}><FontAwesomeIcon icon={faPlus}/> Add Movies</button>

        </div>
    )
}

export default SimilarMovies
