import React, {useEffect} from "react";
import {useForm, useFieldArray, useWatch} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

function Actors(props) {

    const {register, control, handleSubmit} = useForm({
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
        <div>
            {fields.map((item, index) => {
                console.log('BONJOUR', item);
                return (
                    <div className="col-12 row  justify-content-center align-items-center" key={index}>
                        <div className="col-2 row">
                            <button className="btn btn-danger buttonStyle col-6" onClick={() => remove(index)}>
                                <FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                        <div className=" form-group col-4">
                            <label className="label--desc col-8 text-center">name</label>
                            <input type="text" className="actorInput col-12  m-0" id="inputCity"
                                   defaultValue={`${item.name}`}
                                   ref={register()} name={'actorName_' + index}/>
                        </div>
                        <div className="form-group col-3">
                            <label className="label--desc col-8 text-center"> image url</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   defaultValue={`${item.photo}`}
                                   ref={register} name={'imgUrl_' + index}/>

                        </div>
                        <div className="form-group col-3">
                            <label className="label--desc col-8 text-center">character</label>
                            <input type="text" className="actorInput col-12" id="inputCity"
                                   defaultValue={`${item.character}`}
                                   ref={register} name={'character_' + index}/>

                        </div>

                    </div>

                );
            })}
            <button type="button" className="btn btn-dark col-6"  onClick={() => {
                append({ name: "",photo: "" , character: "" });
            }}><FontAwesomeIcon icon={faPlus}/>  Add actor</button>

        </div>
    )
}

export default Actors
