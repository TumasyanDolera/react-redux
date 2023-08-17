import React from 'react';
import {  useParams } from 'react-router';
import { useEffect, useState } from 'react';
import EditModal from '../EditModal/EditModal';
import { useNavigate } from 'react-router-dom';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './SingleTask.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getEditTask, removeSingleTask, saveCheckedTasks } from '../../Redux/Reducer';
import {  useDeleteTaskMutation, useGetSingleTaskQuery } from '../../Redux/API';



const REACT_APP_URL_API = process.env.REACT_APP_URL_API;

export default function SingleTask() {
    const [taskData, setTaskData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch;
    const { data } = useGetSingleTaskQuery(id)
    const [deleteSingleTask, result] = useDeleteTaskMutation()
    const editTaskObj = useSelector((state) => state.tasksReducer.editTaskObj)
    
    
    useEffect(() => {if (data) {
        setTaskData(data);
    }
      }, [data])

      const handleRemoveSingleTask = (taskId)=> {
        deleteSingleTask(taskId)
        .then(() => {
            dispatch(removeSingleTask(taskId))
            navigate('/')
        })
        .catch((err) => console.log(err))
    }
 const handleEditTask = (taskData) => {
    dispatch(getEditTask(taskData))
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
                 <div className={classes.button2}>
                    <Button
                        className={classes.dangerDelete}
                        variant="danger"
                        onClick={() => handleRemoveSingleTask(taskData.id)}
                        taskData = {!taskData}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                    className={classes.buttonEdit}
                    onClick={() => {handleEditTask(taskData)}}>
                    <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </div>
                     </div> 
                    
        },
         {!!editTaskObj && <EditModal/>}
      
       </>

    )
}