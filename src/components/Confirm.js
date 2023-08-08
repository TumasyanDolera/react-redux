import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { memo } from 'react';

function Confirm(props) {
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
                <Button variant='warning' onClick={props.handleRemovedCheckedTasks}>Confirm</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default memo(Confirm);