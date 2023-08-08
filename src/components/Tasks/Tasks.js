import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import classes from './tasks.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Tasks ({item, handleRemoveSingleTask, disabledButton, handleEditTask, handleCheckedTasks}) {
    const[isChecked, setIsChecked] = useState(false)

    function toggleCheckbox  (id) {
        handleCheckedTasks(id);
        setIsChecked(!isChecked)
    }

     return (
        <Card className={`${classes.card} ${isChecked ? classes.checkedTaskCard : ''}`}>
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
                <Button
                    className='m-2'
                    disabled={disabledButton}
                    variant="danger"
                    onClick={() => 
                        handleRemoveSingleTask(item.id)
                        }>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                    className={classes.button}
                    disabled={disabledButton}
                    onClick={() => 
                        handleEditTask(item)
                        }>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>

            </Card.Footer>
        </Card>
    )
}

Tasks.propType = {
    item: PropTypes.object,
    handleRemoveSingleTask: PropTypes.func,
    handleCheckedTasks: PropTypes.func,
    disabledButton: PropTypes.number,}


