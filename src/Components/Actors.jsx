import React, {useEffect} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

function Actors(props) {

    const {control} = useForm({
        defaultValues: {
            actors: props.actors
        }
    });
    const {fields, append, remove} = useFieldArray({
        control,
        name: "actors"
    });
    useEffect(() => {
        console.log(props)
    });
    return (
        <div className="row justify-content-center justify-content-xl-start">
            {fields.map((item, index) => {
                return (
                    <div className="col-12 row justify-content-center  justify-content-lg-between  flex-wrap align-items-center" key={index}>
                        <div className="col-xl-2 col-6 justify-content-center  row">
                            <button className="btn btn-danger buttonStyle col-6" onClick={() => remove(index)}>
                                <FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                        <div className=" form-group col-12 col-xl-4 row justify-content-center">
                            <label className="label--desc col-8 text-center">name</label>
                            <input type="text" className="actorInput col-12  m-0" id="inputCity"
                                   defaultValue={`${item.name}`}
                                   ref={props.register} name={`actor_${index}_name`}/>
                        </div>
                        <div className="form-group col-12 col-xl-3 row justify-content-center">
                            <label className="label--desc col-8 text-center"> image url</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   defaultValue={`${item.photo}`}
                                   ref={props.register} name={`actor_${index}_photo`}/>

                        </div>
                        <div className="form-group col-12 col-xl-3 row justify-content-center">
                            <label className="label--desc col-8 text-center">character</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   defaultValue={`${item.character}`}
                                   ref={props.register} name={`actor_${index}_character`}/>

                        </div>

                    </div>

                );
            })}
            <button type="button" className="btn btn-dark col-6 m-auto"  onClick={() => {
                append({ name: "",photo: "" , character: "" });
            }}><FontAwesomeIcon icon={faPlus}/>  Add actor</button>

        </div>
    )
}

export default Actors
