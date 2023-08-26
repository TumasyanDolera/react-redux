import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCheckedTassk, getAllTasks } from '../Redux/Features/Reducer';
import { useDeleteTaskMutation } from '../Redux/Services/API';

function Confirm(props) {
    const checkedTasks = useSelector((state) => state.tasksReducer.checkedTasks);
    const toDoList = useSelector((state) => state.tasksReducer.toDoList);
    const dispatch = useDispatch();
    const [deleteChackedTask, response] = useDeleteTaskMutation();

    const handleRemovedCheckedTasks = () => {
        let newToDoLiST = [...toDoList];
        deleteChackedTask(checkedTasks)
            .then((obj) => {
                checkedTasks.forEach(itemId => {
                    newToDoLiST = newToDoLiST.filter(item => item.id !== itemId)
                   

                })
                dispatch(getAllTasks(newToDoLiST));
                dispatch(cleanCheckedTassk());
                props.onHide();

            })
            .catch((err) => console.log(err));
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Are you sure to remove {props.count} tasks ?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant='warning' onClick={handleRemovedCheckedTasks}>Confirm</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default memo(Confirm);