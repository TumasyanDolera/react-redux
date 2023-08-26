import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import classes from "./AddNewTask.module.css";
import { createTask} from "../../Redux/Features/Reducer";
import { useCreateTaskMutation } from "../../Redux/Services/API";
import { useDispatch } from 'react-redux';
import { Add } from '../Toastify/Message';

function AddNewTaskModal ({ onClose, toggleNewTaskModal}) {
    const titleInputRef = useRef();
    const dispatch = useDispatch();
    const [createTaskRequest, response] = useCreateTaskMutation();
    const [newTaskObj, setNewTaskObj] = useState({
          
            title: null,
            description: null,
            startData: null,
            endData: null,
            importance: null,
            developer: null,
        })
        useEffect(()=>{
            titleInputRef.current.focus();
        },[])
        

   
    function handleInputChange (event)  {
        setNewTaskObj({  ...newTaskObj, [event.target.name]: event.target.value })

    }

    function handleRadioChange  (event) {
        setNewTaskObj({  ...newTaskObj, importance: event.target.name })
    }

    function handleSelectChange  (event)  {
        setNewTaskObj({ ...newTaskObj, developer: event.target.value})
    }

    const createNewTask = (event) => {
        event.preventDefault();

         const { title, description, importance, developer, startData, endData } = newTaskObj;
        if (!title || !description || !importance || !developer || !startData || !endData) {

            return;
        }
         createTaskRequest(newTaskObj)
        .then((task) => {
            console.log(task)
            dispatch(createTask(task.data))
            Add()
            toggleNewTaskModal(!toggleNewTaskModal)
            
        })
        .catch(() => {
            Error()
        })
       
        
        
      }
    

    function handleAddKeyDown(event) {
        if (event.key === "Enter") {
            createNewTask(event)
        }
    }
 return (  <>
            <Modal
                className= {classes.modal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={true}
                onHide={onClose}
                
            >
                <Modal.Header closeButton className= {classes.header}>
                    <Modal.Title className= {classes.title}>
                         NEW TASK
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body className= {classes.body}>
                    <Form onKeyDown={handleAddKeyDown}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2} className= {classes.title1}>
                                Title
                            </Form.Label>
                            <Col sm={10} >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Title" 
                                    name="title" 
                                    value={newTaskObj.titleRef}
                                    onChange={handleInputChange}
                                    ref={titleInputRef}
                                    
                                     />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" >
                            <Form.Label column sm={2} className={classes.description}>
                                Description
                            </Form.Label>
                            <Col sm={10}>

                                    <Form.Control 
                                        controlId="floatingTextarea"
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        name="description"
                                        value={newTaskObj.description} 
                                        onChange={handleInputChange}
                                        />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" >
                            <Form.Label column sm={2} className={classes.startData}>
                                Start
                            </Form.Label>
                            <Col sm={10}>

                                    <Form.Control 
                                        controlId="floatingTextarea"
                                        type = "date"
                                        placeholder="L"
                                        name="startData"
                                        value={newTaskObj.startData} 
                                        onChange={handleInputChange}
                                        />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" >
                            <Form.Label column sm={2} className={classes.finishData}>
                                Finis
                            </Form.Label>
                            <Col sm={10}>

                                    <Form.Control
                                        controlId="floatingTextarea"
                                        type = "date"
                                        placeholder=""
                                        name="endData"
                                        value={newTaskObj.endData} 
                                        onChange={handleInputChange}
                                        />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={2} className={classes.developer}>
                                Developer
                            </Form.Label>

                            <Col sm={10}>
                                <Form.Select aria-label="Default select example" value={newTaskObj.developerdeveloper} onChange={handleSelectChange}>
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
                            <Form.Group as={Row} className="mb-3" >
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
                <Modal.Footer className= {classes.footer}>
                    <Button variant='primary' onClick={createNewTask}>Add</Button>
                    <Button variant="secondary" onClick={onClose}>Cansel</Button>
                </Modal.Footer>
            </Modal>
          
            
            </>
        );
 }
 
export default AddNewTaskModal







