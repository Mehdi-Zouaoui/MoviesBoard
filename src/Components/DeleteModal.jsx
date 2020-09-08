import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Redirect} from "react-router";

function DeleteModal(props) {

    const [show, setShow] = useState(false);
    const [redirectTo, setRedirectTo] = useState("");

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => {
        setShow(true)
    };

    const deleteMovie = (id) => {
        if(props.noWord){
            setRedirectTo('/movies')
        }
      props.delete(id);
      handleClose();
    };

    return (
        <>
            {redirectTo ? <Redirect to={redirectTo}/> : ''}
            <Button type="button"
                    variant=" mr-1 btn btn-danger"
                    onClick={handleShow}>{props.noWord ? '' : 'Delete '}<FontAwesomeIcon icon={faTrash}/></Button>
            <Modal show={show}
                   onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Supprimer ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Voulez-vous vraiment supprimer le film ?</Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-success'
                            onClick={() => {deleteMovie(props.id)}}>Oui</Button>
                    <Button className='btn btn-danger'
                            onClick={handleClose}>Non</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DeleteModal;


