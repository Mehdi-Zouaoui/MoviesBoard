import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, {useEffect, useState} from "react";
import {faTrash , faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function DeleteModal(props) {
    const [show, setShow] = useState(false);
    const [index , setIndex] = useState(0);

    useEffect ( () => {
        setIndex(props.index)
    });

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    const deleteMovie = (index) => {
      props.delete();
      handleClose();
    };

    return (
        <>
            <Button variant=" btn mr-1 col-xl-2 w-100  btn-ico btn-outline-warning" onClick={handleShow}>Delete <FontAwesomeIcon icon={faTrash}/>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Supprimer ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Voulez-vous vraiment supprimer le film ?</Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-success' onClick={() => {deleteMovie(index)}}>
                        Oui
                    </Button>
                    <Button className='btn btn-danger' onClick={handleClose}>
                        Non
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModal


