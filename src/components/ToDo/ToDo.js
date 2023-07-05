import React, { PureComponent } from "react";
import AddNewTask from "../AddNewTask/AddNewTask";
import Tasks from "../Tasks/Tasks";
import Confirm from "../Confirm";
import { idGenerator } from '../../utils/utils'
import { Container, Row, Col, Button } from "react-bootstrap";




export default class ToDo extends PureComponent {
    state = {
        toDoList: [{
            id: idGenerator(),
            title: 'test',
            description: 'HELLO WORLD',
            importance: 'HIGH',
            developer: 'Aksana'
        }],

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





    render() {
        const { toDoList, checkedTasks, toggleConfirmModal } = this.state;



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
            </Container>
        )
    }
}