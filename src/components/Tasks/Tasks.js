import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import classes from './tasks.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEditTask, removeSingleTask, saveCheckedTasks } from '../../Redux/Reducer';
import { useNavigate } from "react-router";
import { useDeleteTaskMutation } from '../../Redux/API';




export default function Tasks ({item, handleShowDeleteButton}) {
    const checkedTasks = useSelector((state)=>state.tasksReducer.checkedTasks);
    console.log(checkedTasks)
    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [deleteTask, result] = useDeleteTaskMutation()

    const toggleCheckbox = (id)=>{
          dispatch(saveCheckedTasks(id))
          setIsChecked(!isChecked)
    }
    const handleRemoveSingleTask = (taskId)=> {
        deleteTask(taskId)
        .then(() => {
            dispatch(removeSingleTask(taskId))
            navigate('/')
        })
        .catch((err) => console.log(err))
    }
    

     return (
        
        <Card className={`${classes.card} ${isChecked ? classes.checkedTaskCard : ''}`}
        >
            <Card.Header className={classes.header}>
                <input
                    onChange={() => 
                       toggleCheckbox(item.id)
                    }
                    className={`${classes.cardCeckbox} m-2`}
         
                    type="checkbox"
                />
            </Card.Header>
            <Card.Body className={classes.body}>
                <Card.Title  >
                    <Link to={`/task/${item.id}`} className={classes.title}>
                        Title: {item.title}
                    </Link>
                </Card.Title>
                <Card.Text className={classes.description}>
                    Description: {item.description}
                </Card.Text>
                <ListGroup className={classes.body}>
                    <ListGroup.Item className={classes.startData}>StartData: {item.startData}</ListGroup.Item>
                    <ListGroup.Item className={classes.finishData}>FinishData: {item.endData}</ListGroup.Item>
                    <ListGroup.Item className={classes.importance}>Importance: {item.importance}</ListGroup.Item>
                    <ListGroup.Item className={classes.developer}>Developer: {item.developer}</ListGroup.Item>
                </ListGroup>
            </Card.Body>

            <Card.Footer className={classes.footer}>
               <div className={classes.button2}> <Button
                    disabled={checkedTasks.length > 0}
                    variant="danger"
                    onClick={() => 
                        handleRemoveSingleTask(item.id)
                        }>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                    className={classes.button}
                    disabled={checkedTasks.length > 0}
                    onClick={() => dispatch(getEditTask(item))}>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
                </div>
            </Card.Footer>
        </Card>
        
    )
}

Tasks.propType = {
    item: PropTypes.object,
    handleRemoveSingleTask: PropTypes.func,
    handleCheckedTasks: PropTypes.func,
    disabledButton: PropTypes.number,}


