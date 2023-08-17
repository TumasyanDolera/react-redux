import React, { useState, useEffect } from "react";
import AddNewTaskModal from "../../AddNewTask/AddNewTask";
import Tasks from "../../Tasks/Tasks";
import Confirm from "../../Confirm";
import { Container, Row, Col, Button } from "react-bootstrap";
import EditModal from "../../EditModal/EditModal";
import classes from './ToDo.module.css';
import {useGetAllTasksQuery} from "../../../Redux/API";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../../Redux/Reducer";
import Loading from "../../Loading/Loading";


const REACT_APP_URL_API = process.env.REACT_APP_URL_API;

export default function ToDo({}){
    
       const toDoList = useSelector((state)=>state.tasksReducer.toDoList);
       const editTaskObj = useSelector((state)=>state.tasksReducer.editTaskObj)
       const checkedTasks = useSelector((state)=>state.tasksReducer.checkedTasks);
       let [toggleConfirmModal, setToggleConfirmModal] = useState(false)
       let [showNewTaskModal, setShowNewTaskModal] = useState(false)
       const { data,isLoading } = useGetAllTasksQuery();
       const dispatch = useDispatch();
    //    const[showDeleteButton, setShowdeleteButton] = useState(false)
   
    
      


       useEffect(() => {
        if (data) {
            dispatch(getAllTasks(data));
        }
    }, [data])

        
 function handleToggleShowCofirmModal () {
           setToggleConfirmModal(!toggleConfirmModal)
    }

   function tooggleHide ()  {
        
        setToggleConfirmModal(!toggleConfirmModal)
    
    }


     function toggleNewTaskModal(){
        
            setShowNewTaskModal (!showNewTaskModal)
    
     }
   

      return (
               <>
               { isLoading && <Loading />}
               <Container fluid>
                <Row >
                    <Col >
                        <button 
                           className={classes.Add}
                            onClick={toggleNewTaskModal}
                            disabled={checkedTasks.length > 0 }
                            >
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
                                        
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
               
                    {/* { showDeleteButton && */}
                     <Button className={classes.delete}
                        onClick={handleToggleShowCofirmModal}
                        variant="danger"
                        disabled={checkedTasks.length < 0}
                    >DELETE</Button>
                    {/* } */}

                
                
                <Confirm
                    show={toggleConfirmModal}
                    onHide={tooggleHide}
                   
              
                />
               
                 {!!editTaskObj && <EditModal />}
                {
                    showNewTaskModal &&
                    <AddNewTaskModal
                    toggleNewTaskModal={toggleNewTaskModal}
                     onClose={toggleNewTaskModal}
                    />
                }
            </Container>
            </>
             )
            }
