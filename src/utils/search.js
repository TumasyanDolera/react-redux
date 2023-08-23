import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';


function SearchTask({ tasks }) {
    return (


        <div>
            {
               tasks.map(task => {
                return (
                    <div key={task.id}>
                        <Link className='link' to={`task/${task.id}`}>{task.title}</Link>
                    </div>
                )
            })
            }
        </div>
    );
}

export default SearchTask;