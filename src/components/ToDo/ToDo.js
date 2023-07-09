import React, { PureComponent } from "react";
import AddNewTask from "../AddNewTask/AddNewTask";
import Tasks from "../Tasks/Tasks";
import Confirm from "../Confirm";
import { Container, Row, Col, Button } from "react-bootstrap";
import EditModal from "../EditModal";




export default class ToDo extends PureComponent {
    state = {
        toDoList: [],
        editedTask:null,
        checkedTasks: new Set(),
        toggleConfirmModal: false
    };



    handleAddTask = (neweObj) => {
        let toDoList = [...this.state.toDoList];
        toDoList.push(neweObj);
        this.setState({
            toDoList,

        })


    }

    handleRemoveSingleTask = (taskId) => {
        let toDoList = [...this.state.toDoList];

        toDoList = toDoList.filter(item => taskId !== item.id)

        this.setState({
            toDoList,
        })

    }

    handleCheckedTasks = (taskID) => {
        let checkedTasks = new Set(this.state.checkedTasks);

        if (checkedTasks.has(taskID)) {
            checkedTasks.delete(taskID);
        } else {
            checkedTasks.add(taskID);
        }

        this.setState({
            checkedTasks
        })

    }


    handleRemovedCheckedTasks = () => {
        let toDoList = [...this.state.toDoList];
        let checkedTasks = new Set(this.state.checkedTasks);

        checkedTasks.forEach(itemId => {
            toDoList = toDoList.filter(item => item.id !== itemId)
        })

        checkedTasks.clear()

        this.setState({
            checkedTasks,
            toDoList,
            toggleConfirmModal: false

        })



    }

    handleToggleShowCofirmModal = () => {
        this.setState({
            toggleConfirmModal: !this.setState.toggleConfirmModal,
        })
    }

    tooggleHide = () => {
        this.setState({
            toggleConfirmModal: false
        })

    }

    handleEditTask =(taskObj)=>{
        this.setState({
            editedTask:taskObj,
        })
    }

handleSaveEditedTask =(taskObj)=>{
    let toDoList = [...this.state.toDoList];

    let index  = toDoList.findIndex((item)=>item.id === taskObj.id);
    toDoList[index] = {
        ...toDoList[index],
        ...taskObj
    }

    this.setState({
        toDoList,
        editedTask:null
    })

}

    render() {
        const { toDoList, checkedTasks, toggleConfirmModal , editedTask} = this.state;



        return (
            <Container fluid>
                <Row className="justify-content-center">
                    <AddNewTask
                        handleAddTask={this.handleAddTask}
                        disabledButton={checkedTasks.size}
                    />
                </Row>

                <Row className="mt-5">
                    {

                        toDoList.map((item) => {
                            return (
                                <Col key={item.id}>
                                    <Tasks item={item}
                                        handleRemoveSingleTask={this.handleRemoveSingleTask}
                                        handleCheckedTasks={this.handleCheckedTasks}
                                        disabledButton={checkedTasks.size}
                                        handleEditTask={this.handleEditTask}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row className="justify-content-center" >
                    <Button
                        onClick={this.handleToggleShowCofirmModal}
                        variant="danger"
                        className="w-25 mt-5"
                        disabled={!checkedTasks.size}
                    >Remove checked tasks</Button>

                </Row>
                <Confirm
                    show={toggleConfirmModal}
                    onHide={this.tooggleHide}
                    handleRemovedCheckedTasks={this.handleRemovedCheckedTasks}
                    count={checkedTasks.size}
                />
                {
                    !!editedTask && 
                    <EditModal 
                    onClose={()=>this.handleEditTask(null)}
                    editTaskData={editedTask}
                    onSave={this.handleSaveEditedTask}
                    />
                }
            </Container>
        )
    }
}