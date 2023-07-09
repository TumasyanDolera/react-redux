import React, { PureComponent } from 'react';

import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import classes from './tasks.module.css';
import PropTypes from 'prop-types';



export default class Tasks extends PureComponent {
    state = {
        isChecked: false
    }



    toggleCheckbox = (id) => {
        this.props.handleCheckedTasks(id);

        this.setState({

            isChecked: !this.state.isChecked
        })

    }
    render() {
        const { item, handleRemoveSingleTask, disabledButton,handleEditTask } = this.props;
        const { isChecked } = this.state;

        return (
            <Card className={`${classes.card} ${isChecked ? classes.checkedTaskCard : ''}`}>
                <input
                    onChange={() => this.toggleCheckbox(item.id)}
                    className={`${classes.cardCeckbox} m-2`}
                    type="checkbox"
                />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{item.importance}</ListGroup.Item>
                    <ListGroup.Item>{item.developer}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Button
                        className='m-2'
                        disabled={disabledButton}
                        variant="danger"
                        onClick={() => handleRemoveSingleTask(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                        className='m-2'
                        disabled={disabledButton}
                        variant="info"
                        onClick={()=>handleEditTask(item)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>

                </Card.Body>
            </Card>
        )
    }
}


Tasks.propType = {
    item: PropTypes.object,
    handleRemoveSingleTask: PropTypes.func,
    handleCheckedTasks: PropTypes.func,
    disabledButton: PropTypes.number,
}