import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePutTaskMutation } from '../../Redux/Services/API';
import { putTask, getEditTask } from '../../Redux/Features/Reducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import classes from './EditModal.module.css';
import { Update, Error } from '../Toastify/Message';

export default function EditModal({ }) {
    const [sendPutTask] = usePutTaskMutation();
    const dispatch = useDispatch();
    const editTaskObj = useSelector((state) => state.tasksReducer.editTaskObj);
    const [newTaskObj, setNewTaskObj] = useState(editTaskObj);
    


    function handleInputChange(event) {
        setNewTaskObj({ ...newTaskObj, [event.target.name]: event.target.value })
    }

    function handleRadioChange(event) {
        setNewTaskObj({ ...newTaskObj, importance: event.target.name })
    }

    function handleSelectChange(event) {
        setNewTaskObj({ ...newTaskObj, developer: event.target.name })
    }

    const handleAddEditedTask = () => {

        sendPutTask(newTaskObj)
            .then((res) => {
                dispatch(putTask(res))
                dispatch(getEditTask(null))
                Update()
            })
            .catch(() => {
                Error()
            })
    }

    function handleAddKeyDown(event) {
        if (event.key === "Enter") {
            handleAddEditedTask(event)
        }

    }
    return (
        <Modal

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true}
            onHide={() => dispatch(getEditTask(null))}
        >
            <Modal.Header closeButton className={classes.header}>
                <Modal.Title className={classes.title}>
                    Edit Task
                </Modal.Title>

            </Modal.Header>
            <Modal.Body className={classes.body}>
                <Form onKeyDown={handleAddKeyDown}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2} className={classes.title1}>
                            Title
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Title" name="title" value={newTaskObj.title} onChange={handleInputChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" onChange={handleInputChange}>
                        <Form.Label column sm={2} className={classes.description}>
                            Description
                        </Form.Label>

                        <Col sm={10}>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Description"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    name="description"
                                    value={newTaskObj.description} />
                            </FloatingLabel>
                        </Col>

                        <Form.Group as={Row} className="mb-3">

                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2} className={classes.startData}>
                                Start
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="date" name="startData" value={newTaskObj.startData} onChange={handleInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2} className={classes.finishData}>
                                Finish
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="date" name="endData" value={newTaskObj.endData} onChange={handleInputChange} />
                            </Col>
                        </Form.Group>
                         <Form.Label as="legend" column sm={2} className={classes.developer}>
                            Developer
                        </Form.Label>
                        <Col sm={10}>
                                <Form.Select aria-label="Default select example" value={newTaskObj.developer} onChange={handleSelectChange}>
                                    <option value="">Select a developer</option>
                                    <option value="Aksana">Aksana</option>
                                    <option value="Hovo">Hovo</option>
                                    <option value="Vardges">Vardges</option>
                                    <option value="Armen">Armen</option>
                                    <option value="ELizabet">Elizabet</option>
                                    <option value="Dolera">Dolera</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    <fieldset>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={2} className={classes.radio}>
                                Radios
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="low"
                                    name="low"
                                    id="formHorizontalRadios1"
                                    checked={newTaskObj.importance === "low"}
                                    onChange={handleRadioChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="medium"
                                    name="medium"
                                    id="formHorizontalRadios2"
                                    checked={newTaskObj.importance === "medium"}
                                    onChange={handleRadioChange}

                                />
                                <Form.Check
                                    type="radio"
                                    label="high"
                                    name="high"
                                    id="formHorizontalRadios3"
                                    checked={newTaskObj.importance === "high"}
                                    onChange={handleRadioChange}

                                />
                            </Col>
                        </Form.Group>
                    </fieldset>
                </Form>
            </Modal.Body>
            <Modal.Footer className={classes.footer}>
                <Button variant='primary' onClick={handleAddEditedTask}>Confirm</Button>
                <Button variant="secondary" onClick={() => dispatch(getEditTask(null))}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}




