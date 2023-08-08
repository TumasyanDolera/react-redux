import {  useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './SingleTask.module.css';
import {PostTodo, GetTodo, PutTodo, DeleteTodo} from "../../utils/request";

const REACT_APP_URL_API = process.env.REACT_APP_URL_API;

export default function SingleTask() {
    const [taskData, setTaskData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    

    useEffect(() => {

        fetch(`${REACT_APP_URL_API}/tasks/${id}`, {
            method: 'G',
        })
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(task => {
                console.log('DDDDDD====>>>>', task);

                setTaskData({
                    ...taskData,
                    ...task
                })

            },)
            .catch(error => console.log(error))

    }, )

        const handleRemoveSingleTask = (taskId) => {

            fetch(`${REACT_APP_URL_API}/tasks/${taskId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw response.error
                    }
                    return response.json()
                })
                .then(navigate('/'))
                .catch(error => console.log(error))
    
    
        }
    


 return (


        <>
        {
            taskData &&
            <div className={classes.div1}>
                <h6 className={classes.tasktitle}> {taskData.title}</h6>
                <p className={classes.taskdescription}>DESCRIPTION: {taskData.description}</p>
                <h4 className={classes.taskData}>STARTDATA: {taskData.startData}</h4>
                <h4 className={classes.taskData}>ENDDATA: {taskData.endData}</h4>
                <h5 className={classes.taskdeveloper}>DEVELOPER: {taskData.developer}</h5>
                <h5 className={classes.taskimportance}>IMPORTANCE: {taskData.importance}</h5>
                <Button
                        className={classes.danger}
                        variant="danger"
                        onClick={() => handleRemoveSingleTask(taskData.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                   
                </div>
        }
      
</>

    )
}