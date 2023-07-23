import React, { PureComponent } from "react";
import AddNewTaskModal from "../../AddNewTask/AddNewTask";
import Tasks from "../../Tasks/Tasks";
import Confirm from "../../Confirm";
import { Container, Row, Col, Button } from "react-bootstrap";
import EditModal from "../../EditModal";

const REACT_APP_URL_API = process.env.REACT_APP_URL_API;




export default class ToDo extends PureComponent {
    state = {
        toDoList: [],
        editedTask: null,
        checkedTasks: new Set(),
        toggleConfirmModal: false,
        showNewTaskModal: false,
    };

    componentDidMount() {
        fetch(`${REACT_APP_URL_API}/tasks`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(tasks => {
                let toDoList = [...this.state.toDoList, ...tasks];
                this.setState({
                    toDoList,
                })
            })
            .catch(error => console.log(error))

    }


    handleAddTask = (neweObj) => {
        let toDoList = [...this.state.toDoList];

        fetch(`${REACT_APP_URL_API}/tasks`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(neweObj)
        })
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(task => {
                toDoList.push(task);
                this.setState({
                    toDoList,
                    showNewTaskModal: false

                })
            })
            .catch(error => console.log(error))

    }

    handleRemoveSingleTask = (taskId) => {
        let toDoList = [...this.state.toDoList];

        fetch(`${REACT_APP_URL_API}/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw response.error
                }
                return response.json()
            })
            .then(task => {
                toDoList = toDoList.filter(item => taskId !== item.id)

                this.setState({
                    toDoList,
                })
            })
            .catch(error => console.log(error))


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

    handleEditTask = (taskObj) => {
        this.setState({
            editedTask: taskObj,
        })
    }

    handleSaveEditedTask = (taskObj) => {
        let toDoList = [...this.state.toDoList];

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
                let index = toDoList.findIndex((item) => item.id === taskObj.id);
                toDoList[index] = {
                    ...toDoList[index],
                    ...taskObj
                }

                this.setState({
                    toDoList,
                    editedTask: null
                })
            })
            .catch(error => console.log(error))




    }

    toggleNewTaskModal = () => {
        this.setState({
            showNewTaskModal: !this.state.showNewTaskModal,
        })
    }

    render() {
        const { toDoList, checkedTasks, toggleConfirmModal, editedTask, showNewTaskModal } = this.state;



        return (
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className="text-center mt-5">
                        <Button
                            variant="info"
                            className="w-25"
                            onClick={this.toggleNewTaskModal}
                            disabled={checkedTasks.size}>
                            Add task
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-5">
                    {

                        toDoList.map((item) => {
                            return (
                                <Col key={item.id} sm="12" md="6" lg="4" xl="3">
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
                        onClose={() => this.handleEditTask(null)}
                        editTaskData={editedTask}
                        onSave={this.handleSaveEditedTask}
                    />
                }
                {
                    showNewTaskModal &&
                    <AddNewTaskModal
                        handleAddTask={this.handleAddTask}
                        onClose={this.toggleNewTaskModal}
                    />
                }
            </Container>
        )
    }
}