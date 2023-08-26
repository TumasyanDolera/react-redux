import React, { useState, useEffect } from "react";
import AddNewTaskModal from "../../AddNewTask/AddNewTask";
import Tasks from "../../Tasks/Tasks";
import Confirm from "../../Confirm";
import { Container, Row, Col, Button } from "react-bootstrap";
import EditModal from "../../EditModal/EditModal";
import classes from './ToDo.module.css';
import {useGetAllTasksQuery, useSearchTaskQuery} from "../../../Redux/Services/API";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../../Redux/Features/Reducer";
import Loading from "../../Loading/Loading";
import { useDebounce } from "../../../utils/customHook";
import SearchTask from "../../../utils/search";

const REACT_APP_URL_API = process.env.REACT_APP_URL_API;

export default function ToDo({}){
       const [searchText, setSearchText] = useState('');
       const debounced = useDebounce(searchText)
       const { data: searchResults } = useSearchTaskQuery(debounced);
       const toDoList = useSelector((state)=>state.tasksReducer.toDoList);
       const editTaskObj = useSelector((state)=>state.tasksReducer.editTaskObj)
       const checkedTasks = useSelector((state)=>state.tasksReducer.checkedTasks);
       let [toggleConfirmModal, setToggleConfirmModal] = useState(false)
       let [showNewTaskModal, setShowNewTaskModal] = useState(false)
       const { data,isLoading } = useGetAllTasksQuery();
       const dispatch = useDispatch();
       const[showDeleteButton, setShowdeleteButton] = useState(false)
   
       useEffect(() => {
        if (data) {
            dispatch(getAllTasks(data));
        }
    }, [data])

        
 function handleToggleShowCofirmModal () {
           setToggleConfirmModal(!toggleConfirmModal)
           
    }
    function handleDeleteButton () {
        setShowdeleteButton(!showDeleteButton)
        
 }

   function tooggleHide ()  {
        
        setToggleConfirmModal(!toggleConfirmModal)
    
    }

    function toggleNewTaskModal(){
        
            setShowNewTaskModal (!showNewTaskModal)
    
     }
     const handleSearchChange = (event) => {
        setSearchText(event.target.value)
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
                <div className="justify-content-center">
                   <div className={classes.Search1}>
                        <input className={classes.Search}
                        type="search" 
                        placeholder="Search"
                        value={searchText} 
                        onChange={handleSearchChange} />
                    </div>
                </div>
                {
                    searchResults && <div className="justify-content-center">
                        <div className={classes.result}>
                            <SearchTask  tasks={searchResults}  />
                        </div>
                    </div>
                }
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
               
                    { showDeleteButton && 
                     <Button className={classes.delete}
                        onClick={handleToggleShowCofirmModal}
                        variant="danger"
                        disabled={checkedTasks.length < 0}
                        handleDeleteButton={checkedTasks.length >= 0}
                    >DELETE</Button>
                    }

                
                
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
