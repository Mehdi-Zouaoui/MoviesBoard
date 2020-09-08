import React from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

function Actors(props) {

    const {control} = useForm({
        defaultValues: {
            actors: props.actors
        }});

    // Utilisation de useFieldArray https://react-hook-form.com/advanced-usage#FieldArrays
    // Permet de controller la création d'inputs via fields qui à comme valeur par défaut le tableau d'ojbect actors.
    // Grace aux méthodes append et remove on peut ajouter ou supprimer un object dans le tableau fields
    const {fields, append, remove} = useFieldArray({
        control,
        name: "actors"
    });

    return (
        <div className="row justify-content-center col-12 justify-content-xl-end">
            {fields.map((item, index) => {
                return (
                    <div className="col-12 row justify-content-center justify-content-lg-between flex-wrap align-items-center"
                         key={index}>
                        <div className="form-group col-12 col-xl-4 row justify-content-center">
                            <label className="label--desc col-8 text-center">name</label>
                            <input type="text"
                                   className="actorInput col-12 m-0"
                                   id="inputCity"
                                   defaultValue={`${item.name}`}
                                   ref={props.register} name={`actor_${index}_name`}/>
                        </div>
                        <div className="form-group col-12 col-xl-3 row justify-content-center">
                            <label className="label--desc col-8 text-center"> image url</label>
                            <input type="text"
                                   className="actorInput col-12"
                                   id="inputCity"
                                   defaultValue={`${item.photo}`}
                                   ref={props.register} name={`actor_${index}_photo`}/>
                        </div>
                        <div className="form-group col-12 col-xl-3 row justify-content-center">
                            <label className="label--desc col-8 text-center">character</label>
                            <input type="text"
                                   className="actorInput col-12"
                                   id="inputCity"
                                   defaultValue={`${item.character}`}
                                   ref={props.register} name={`actor_${index}_character`}/>
                        </div>
                        <div className="col-xl-2 col-6 justify-content-center row">
                            <button type="button"
                                    className="btn btn-danger buttonStyle col-6"
                                    onClick={() => remove(index)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    </div>
                );
            })}
            <button type="button"
                    className="btn btn-dark col-6 m-auto"
                    onClick={() => {append({ name: "",photo: "" , character: "" });}}>
                <FontAwesomeIcon icon={faPlus}/> Add Actors</button>
        </div>
    )
}
export default Actors;
