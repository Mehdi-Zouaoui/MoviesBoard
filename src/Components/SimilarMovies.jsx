import React from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

function SimilarMovies(props) {

    const {control} = useForm({
        defaultValues: {
            similar: props.similar
        }
    });

    // Utilisation de useFieldArray https://react-hook-form.com/advanced-usage#FieldArrays
    // Permet de controller la création d'inputs via fields qui à comme valeur par défaut le tableau d'ojbect actors.
    // Grace aux méthodes append et remove on peut ajouter ou supprimer un object dans le tableau fields
    const {fields, append, remove} = useFieldArray({
        control,
        name: "similar"
    });

    return (
        <div className="row col-12 justify-content-center justify-content-xl-end">
            {fields.map((item, index) => {
                return (
                    <div className="col-12 row justify-content-center justify-content-lg-between align-items-center"
                         key={index}>
                        <div className=" form-group col-12 col-xl-4 row justify-content-center">
                            <label className="label--desc col-8 text-center">Title</label>
                            <input type="text"
                                   className="actorInput col-12  m-0"
                                   id="inputCity"
                                   defaultValue={`${item.title}`}
                                   ref={props.register}
                                   name={`similar_${index}_title`}/>
                        </div>
                        <div className="form-group col-12 col-xl-3 row justify-content-center">
                            <label className="label--desc col-8 text-center"> image url</label>
                            <input type="url"
                                   className="actorInput col-12"
                                   id="inputCity"
                                   defaultValue={`${item.poster}`}
                                   ref={props.register} name={`similar_${index}_poster`}/>

                        </div>
                        <div className="form-group col-12 col-xl-3 row justify-content-center">
                            <label className="label--desc col-8 text-center">date</label>
                            <input type="date"
                                   className="actorInput col-12" id="inputCity"
                                   defaultValue={`${item.release_date}`}
                                   ref={props.register}
                                   name={`similar_${index}_release_date`}/>

                        </div>
                        <div className="col-xl-2 col-6 justify-content-center row">
                            <button type="button"
                                    className="btn btn-danger buttonStyle col-6"
                                    onClick={() => {remove(index);}}>
                                    <FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                    </div>
                );
            })}
            <button type="button"
                    className="btn btn-dark col-6 m-auto"
                    onClick={() => {append({ title: "",poster: "" , release_date: "" })}
            }><FontAwesomeIcon icon={faPlus}/> Add Movies</button>
        </div>
    )
}

export default SimilarMovies
