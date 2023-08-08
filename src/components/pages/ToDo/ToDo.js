import React, { useState, useEffect } from "react";
import AddNewTaskModal from "../../AddNewTask/AddNewTask";
import Tasks from "../../Tasks/Tasks";
import Confirm from "../../Confirm";
import { Container, Row, Col, Button } from "react-bootstrap";
import EditModal from "../../EditModal/EditModal";
import classes from './ToDo.module.css';
import {useGetAllTasksQuery, useDeleteTaskMutation, useAddTaskMutation } from "../../../Redux/API";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks ,removeSingleTask, addSingleTask} from "../../../Redux/Reducer";
import { useNavigate } from "react-router";
import Loading from "../../Loading/Loading";


const REACT_APP_URL_API = process.env.REACT_APP_URL_API;

export default function ToDo(){
    
       let [toDoList, setToDoList] = useState ([])
       let [editedTask, setEditedTask] = useState (null)
       let [checkedTasks, setCheckedTasks] = useState(new Set())
       let [toggleConfirmModal, setToggleConfirmModal] = useState(false)
       let [showNewTaskModal, setShowNewTaskModal] = useState(false)
       let [showButton,setShowButton] = useState (false)
       let [showEditTaskModal, setShowEditTaskModal] = useState(false)

       const { data,isError, isLoading } = useGetAllTasksQuery();
       const dispatch = useDispatch();
    //    const toDoList = useSelector((state) => state.tasksReducer.toDoList);
       const navigate = useNavigate();
       const [deleteTask, result] = useDeleteTaskMutation()
       const [addTask] = useAddTaskMutation()


    useEffect(()=>{
        if(data){
            dispatch(getAllTasks(data));
        }
    }, [data])
    
     function handlePostAddTask(newTaskObj) {
        addTask()
        .then(()=>{
            dispatch(addSingleTask(newTaskObj))
        })
    
    }

    function handleRemoveSingleTask (taskId) {
        deleteTask(taskId)
        .then(() => {
            dispatch(removeSingleTask(taskId))
            navigate('/')
        })
    }

    function handleCheckedTasks  (taskID) {
       
        
        checkedTasks = new Set(checkedTasks);
        if (checkedTasks.has(taskID)) {
            checkedTasks.delete(taskID);
          

        } else {
           checkedTasks.add(taskID);
        
        }
        setCheckedTasks(checkedTasks)
        setShowButton(!showButton)
    
    }
function handleRemovedCheckedTasks (taskId){
        setCheckedTasks = new Set(checkedTasks);
        checkedTasks.forEach(itemId => {
            fetch(`${REACT_APP_URL_API}/tasks/${taskId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw response.error
                    }
                    return response.json()
                })
                .then(() => {
                    toDoList = toDoList.filter(item => item.id !== itemId)
                    setToDoList(toDoList)
                })
                .catch(error => console.log(error))
        })
        checkedTasks = checkedTasks.clear()
        setCheckedTasks(checkedTasks.clear)
        let toDoList = [...this.state.toDoList];
        setShowButton(showButton)
        }
      

    function handleToggleShowCofirmModal () {
           setToggleConfirmModal(!toggleConfirmModal)
    }

   function tooggleHide ()  {
        
        setToggleConfirmModal(!toggleConfirmModal)
    
    }
    function handleEditTaskModal() {
        setShowEditTaskModal(!showEditTaskModal)
    }
   
    function handleEditTask (taskObj) {
        
            setEditedTask(taskObj)
            handleEditTaskModal()
    }

     function handleSaveEditedTask (taskObj)  {
        fetch(`${REACT_APP_URL_API}/tasks/${taskObj.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskObj)
        })
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(task => {
                let toDoList = [toDoList, task]
                let index = toDoList.findIndex((item) => item.id === taskObj.id);
                toDoList[index] = {
                    ...toDoList[index],
                    ...taskObj
                }

                setToDoList([...toDoList])
                setShowEditTaskModal(false)
                setEditedTask(null)
            })
            .catch(error => console.log(error))
        }

     function toggleNewTaskModal(){
        
            setShowNewTaskModal (!showNewTaskModal)
    
    }
      return (
        <>{ isLoading && <Loading />}
            <Container fluid>
                <Row >
                    <Col >
                        <button 
                           className={classes.Add}
                            onClick={toggleNewTaskModal}
                            disabled={checkedTasks.size}>
                            Add Task
                        </button    >
                    </Col>
                </Row>
                

                <Row className="mt-5">
                    {

                        toDoList.map((item) => {
                            return (
                                <Col key={item.id} sm="12" md="6" lg="4" xl="3">
                                    <Tasks item={item}
                                        handleRemoveSingleTask={handleRemoveSingleTask}
                                        handleCheckedTasks={handleCheckedTasks}
                                        disabledButton={checkedTasks.size}
                                        handleEditTask={handleEditTask}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
               { showButton && <Row className="justify-content-center" >
                     <Button className={classes.delete}
                        onClick={handleToggleShowCofirmModal}
                        variant="danger"
                        disabled={!checkedTasks.size}
                    >DELETE</Button>

                </Row>
                }
                <Confirm
                    show={toggleConfirmModal}
                    onHide={tooggleHide}
                    handleRemovedCheckedTasks={handleRemovedCheckedTasks}
                    count={checkedTasks.size}
                />
                {
                    !!editedTask &&
                    <EditModal
                        onClose={() => handleEditTask(null)}
                        editTaskData={editedTask}
                        handleSaveEditedTask={handleSaveEditedTask}
                    />
                }
                {
                    showNewTaskModal &&
                    <AddNewTaskModal
                    handlePostAddTask={handlePostAddTask}
                        onClose={toggleNewTaskModal}
                    />
                }
            </Container>
            </>)
    }

